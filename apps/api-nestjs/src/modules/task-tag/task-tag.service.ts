import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskTag, TaskTagDocument } from '../../database/schemas/task-tag.schema';
import { 
  CreateTaskTagInput, 
  UpdateTaskTagInput, 
  DeleteTaskTagInput,
  TaskTagConnection
} from '../../shared/dto/task-tag.dto';

/**
 * TaskTag service for task tag operations
 */
@Injectable()
export class TaskTagService {
  constructor(
    @InjectModel(TaskTag.name)
    private readonly taskTagModel: Model<TaskTagDocument>,
  ) {}

  /**
   * Create a new task tag
   */
  async create(input: CreateTaskTagInput): Promise<TaskTag> {
    const taskTag = new this.taskTagModel(input);
    const saved = await taskTag.save();
    return saved;
  }

  /**
   * Update a task tag
   */
  async update(input: UpdateTaskTagInput): Promise<TaskTag> {
    const { id, ...updateData } = input;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const updatedTaskTag = await this.taskTagModel.findOneAndUpdate(
      { id },
      { ...cleanUpdateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedTaskTag) {
      throw new Error('Task tag not found');
    }

    return updatedTaskTag;
  }

  /**
   * Delete a task tag
   */
  async delete(input: DeleteTaskTagInput): Promise<TaskTag> {
    const taskTag = await this.taskTagModel.findOne({ id: input.id }).exec();
    
    if (!taskTag) {
      throw new Error('Task tag not found');
    }

    await this.taskTagModel.deleteOne({ id: input.id }).exec();
    return taskTag;
  }

  /**
   * Get task tag by ID
   */
  async getById(id: string): Promise<TaskTag> {
    const taskTag = await this.taskTagModel.findOne({ id }).exec();
    if (!taskTag) {
      throw new Error('Task tag not found');
    }
    return taskTag;
  }

  /**
   * Get task tags with pagination
   */
  async getWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: any
  ): Promise<TaskTagConnection> {
    // TODO: Implement proper pagination logic
    const taskTags = await this.taskTagModel.find(where || {}).exec();
    
    return {
      totalCount: taskTags.length,
      edges: taskTags.map((taskTag, index) => ({
        node: taskTag,
        cursor: `cursor_${index}`,
      })),
    };
  }
}
