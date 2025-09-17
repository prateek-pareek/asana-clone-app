import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectTaskSection, ProjectTaskSectionDocument } from '../../database/schemas/project-task-section.schema';
import { 
  CreateProjectTaskSectionInput, 
  UpdateProjectTaskSectionInput, 
  DeleteProjectTaskSectionInput,
  DeleteProjectTaskSectionAndKeepTasksInput,
  DeleteProjectTaskSectionAndDeleteTasksInput,
  UndeleteProjectTaskSectionAndKeepTasksInput,
  UndeleteProjectTaskSectionAndDeleteTasksInput,
  ProjectTaskSectionConnection,
  DeleteProjectTaskSectionAndKeepTasksPayload,
  DeleteProjectTaskSectionAndDeleteTasksPayload,
  UndeleteProjectTaskSectionAndKeepTasksPayload,
  UndeleteProjectTaskSectionAndDeleteTasksPayload
} from '../../shared/dto/project-task-section.dto';

/**
 * ProjectTaskSection service for project task section operations
 */
@Injectable()
export class ProjectTaskSectionService {
  constructor(
    @InjectModel(ProjectTaskSection.name)
    private readonly projectTaskSectionModel: Model<ProjectTaskSectionDocument>,
  ) {}

  /**
   * Create a new project task section
   */
  async create(input: CreateProjectTaskSectionInput): Promise<ProjectTaskSection> {
    const projectTaskSection = new this.projectTaskSectionModel({
      ...input,
      name: `Section ${Date.now()}`, // Default name
    });
    const saved = await projectTaskSection.save();
    return saved;
  }

  /**
   * Update a project task section
   */
  async update(input: UpdateProjectTaskSectionInput): Promise<ProjectTaskSection> {
    const { id, ...updateData } = input;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const updatedSection = await this.projectTaskSectionModel.findOneAndUpdate(
      { id },
      { ...cleanUpdateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedSection) {
      throw new Error('Project task section not found');
    }

    return updatedSection;
  }

  /**
   * Delete a project task section
   */
  async delete(input: DeleteProjectTaskSectionInput): Promise<ProjectTaskSection> {
    const section = await this.projectTaskSectionModel.findOne({ id: input.id }).exec();
    
    if (!section) {
      throw new Error('Project task section not found');
    }

    await this.projectTaskSectionModel.deleteOne({ id: input.id }).exec();
    return section;
  }

  /**
   * Delete project task section and keep tasks
   */
  async deleteAndKeepTasks(input: DeleteProjectTaskSectionAndKeepTasksInput): Promise<DeleteProjectTaskSectionAndKeepTasksPayload> {
    const section = await this.projectTaskSectionModel.findOne({ id: input.id }).exec();
    
    if (!section) {
      throw new Error('Project task section not found');
    }

    // TODO: Implement task keeping logic
    const keptSection = await this.create({
      projectId: section.projectId,
      requestId: input.requestId,
      workspaceId: input.workspaceId,
    });

    await this.projectTaskSectionModel.deleteOne({ id: input.id }).exec();

    return {
      projectTaskSection: section,
      keptProjectTaskSection: keptSection,
      projectTaskIds: [], // TODO: Get actual project task IDs
    };
  }

  /**
   * Delete project task section and delete tasks
   */
  async deleteAndDeleteTasks(input: DeleteProjectTaskSectionAndDeleteTasksInput): Promise<DeleteProjectTaskSectionAndDeleteTasksPayload> {
    const section = await this.projectTaskSectionModel.findOne({ id: input.id }).exec();
    
    if (!section) {
      throw new Error('Project task section not found');
    }

    // TODO: Implement task deletion logic
    await this.projectTaskSectionModel.deleteOne({ id: input.id }).exec();

    return {
      projectTaskSection: section,
      projectTaskIds: [], // TODO: Get actual project task IDs
      taskIds: [], // TODO: Get actual task IDs
    };
  }

  /**
   * Undelete project task section and keep tasks
   */
  async undeleteAndKeepTasks(input: UndeleteProjectTaskSectionAndKeepTasksInput): Promise<UndeleteProjectTaskSectionAndKeepTasksPayload> {
    const section = new this.projectTaskSectionModel({
      id: `section_${Date.now()}`,
      projectId: input.projectId,
      name: input.name,
      createdAt: new Date(input.createdAt),
      updatedAt: new Date(input.updatedAt),
    });

    const saved = await section.save();

    return {
      projectTaskSection: saved,
      projectTaskIds: input.keptProjectTaskIds,
    };
  }

  /**
   * Undelete project task section and delete tasks
   */
  async undeleteAndDeleteTasks(input: UndeleteProjectTaskSectionAndDeleteTasksInput): Promise<UndeleteProjectTaskSectionAndDeleteTasksPayload> {
    const section = new this.projectTaskSectionModel({
      id: `section_${Date.now()}`,
      projectId: input.projectId,
      name: input.name,
      createdAt: new Date(input.createdAt),
      updatedAt: new Date(input.updatedAt),
    });

    const saved = await section.save();

    return {
      projectTaskSection: saved,
      projectTasks: [], // TODO: Get actual project tasks
    };
  }

  /**
   * Get project task section by ID
   */
  async getById(id: string): Promise<ProjectTaskSection> {
    const section = await this.projectTaskSectionModel.findOne({ id }).exec();
    if (!section) {
      throw new Error('Project task section not found');
    }
    return section;
  }

  /**
   * Get project task sections with pagination
   */
  async getWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: any
  ): Promise<ProjectTaskSectionConnection> {
    // TODO: Implement proper pagination logic
    const sections = await this.projectTaskSectionModel.find(where || {}).exec();
    
    return {
      totalCount: sections.length,
      edges: sections.map((section, index) => ({
        node: section,
        cursor: `cursor_${index}`,
      })),
    };
  }

  /**
   * Get project task sections by task ID
   */
  async getByTaskId(taskId: string, where?: any): Promise<ProjectTaskSection[]> {
    // TODO: Implement task ID filtering
    return this.projectTaskSectionModel.find(where || {}).exec();
  }
}
