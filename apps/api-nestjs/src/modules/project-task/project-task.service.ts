import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectTask, ProjectTaskDocument } from '../../database/schemas/project-task.schema';
import { 
  CreateProjectTaskInput, 
  CreateProjectTaskByTaskIDInput,
  UpdateProjectTaskInput, 
  DeleteProjectTaskInput,
  ProjectTaskConnection
} from '../../shared/dto/project-task.dto';

/**
 * ProjectTask service for project task operations
 */
@Injectable()
export class ProjectTaskService {
  constructor(
    @InjectModel(ProjectTask.name)
    private readonly projectTaskModel: Model<ProjectTaskDocument>,
  ) {}

  /**
   * Create a new project task
   */
  async create(input: CreateProjectTaskInput): Promise<ProjectTask> {
    const projectTask = new this.projectTaskModel(input);
    const saved = await projectTask.save();
    return saved;
  }

  /**
   * Create project task by task ID
   */
  async createByTaskId(input: CreateProjectTaskByTaskIDInput): Promise<ProjectTask> {
    const projectTask = new this.projectTaskModel({
      projectId: input.projectId,
      taskId: input.taskId,
      projectTaskSectionId: '', // TODO: Get default section ID
    });
    const saved = await projectTask.save();
    return saved;
  }

  /**
   * Update a project task
   */
  async update(input: UpdateProjectTaskInput): Promise<ProjectTask> {
    const { id, ...updateData } = input;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const updatedProjectTask = await this.projectTaskModel.findOneAndUpdate(
      { id },
      { ...cleanUpdateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedProjectTask) {
      throw new Error('Project task not found');
    }

    return updatedProjectTask;
  }

  /**
   * Delete a project task
   */
  async delete(input: DeleteProjectTaskInput): Promise<ProjectTask> {
    const projectTask = await this.projectTaskModel.findOne({ id: input.id }).exec();
    
    if (!projectTask) {
      throw new Error('Project task not found');
    }

    await this.projectTaskModel.deleteOne({ id: input.id }).exec();
    return projectTask;
  }

  /**
   * Get project task by ID
   */
  async getById(id: string): Promise<ProjectTask> {
    const projectTask = await this.projectTaskModel.findOne({ id }).exec();
    if (!projectTask) {
      throw new Error('Project task not found');
    }
    return projectTask;
  }

  /**
   * Get project tasks with pagination
   */
  async getWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: any
  ): Promise<ProjectTaskConnection> {
    // TODO: Implement proper pagination logic
    const projectTasks = await this.projectTaskModel.find(where || {}).exec();
    
    return {
      totalCount: projectTasks.length,
      edges: projectTasks.map((projectTask, index) => ({
        node: projectTask,
        cursor: `cursor_${index}`,
      })),
    };
  }
}
