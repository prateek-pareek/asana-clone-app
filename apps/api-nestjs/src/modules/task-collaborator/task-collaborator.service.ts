import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskCollaborator, TaskCollaboratorDocument } from '../../database/schemas/task-collaborator.schema';
import { 
  CreateTaskCollaboratorInput, 
  UpdateTaskCollaboratorInput, 
  DeleteTaskCollaboratorInput,
  TaskCollaboratorConnection
} from '../../shared/dto/task-collaborator.dto';

/**
 * TaskCollaborator service for task collaborator operations
 */
@Injectable()
export class TaskCollaboratorService {
  constructor(
    @InjectModel(TaskCollaborator.name)
    private readonly taskCollaboratorModel: Model<TaskCollaboratorDocument>,
  ) {}

  /**
   * Create a new task collaborator
   */
  async create(input: CreateTaskCollaboratorInput): Promise<TaskCollaborator> {
    const taskCollaborator = new this.taskCollaboratorModel(input);
    const saved = await taskCollaborator.save();
    return saved;
  }

  /**
   * Update a task collaborator
   */
  async update(input: UpdateTaskCollaboratorInput): Promise<TaskCollaborator> {
    const { id, ...updateData } = input;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const updatedTaskCollaborator = await this.taskCollaboratorModel.findOneAndUpdate(
      { id },
      { ...cleanUpdateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedTaskCollaborator) {
      throw new Error('Task collaborator not found');
    }

    return updatedTaskCollaborator;
  }

  /**
   * Delete a task collaborator
   */
  async delete(input: DeleteTaskCollaboratorInput): Promise<TaskCollaborator> {
    const taskCollaborator = await this.taskCollaboratorModel.findOne({ id: input.id }).exec();
    
    if (!taskCollaborator) {
      throw new Error('Task collaborator not found');
    }

    await this.taskCollaboratorModel.deleteOne({ id: input.id }).exec();
    return taskCollaborator;
  }

  /**
   * Get task collaborator by ID
   */
  async getById(id: string): Promise<TaskCollaborator> {
    const taskCollaborator = await this.taskCollaboratorModel.findOne({ id }).exec();
    if (!taskCollaborator) {
      throw new Error('Task collaborator not found');
    }
    return taskCollaborator;
  }

  /**
   * Get task collaborators with pagination
   */
  async getWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: any
  ): Promise<TaskCollaboratorConnection> {
    // TODO: Implement proper pagination logic
    const taskCollaborators = await this.taskCollaboratorModel.find(where || {}).exec();
    
    return {
      totalCount: taskCollaborators.length,
      edges: taskCollaborators.map((taskCollaborator, index) => ({
        node: taskCollaborator,
        cursor: `cursor_${index}`,
      })),
    };
  }
}
