import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskLike, TaskLikeDocument } from '../../database/schemas/task-like.schema';
import { 
  CreateTaskLikeInput, 
  UpdateTaskLikeInput, 
  DeleteTaskLikeInput,
  TaskLikeConnection
} from '../../shared/dto/task-like.dto';

/**
 * TaskLike service for task like operations
 */
@Injectable()
export class TaskLikeService {
  constructor(
    @InjectModel(TaskLike.name)
    private readonly taskLikeModel: Model<TaskLikeDocument>,
  ) {}

  /**
   * Create a new task like
   */
  async create(input: CreateTaskLikeInput): Promise<TaskLike> {
    const taskLike = new this.taskLikeModel(input);
    const saved = await taskLike.save();
    return saved;
  }

  /**
   * Update a task like
   */
  async update(input: UpdateTaskLikeInput): Promise<TaskLike> {
    const { id, ...updateData } = input;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const updatedTaskLike = await this.taskLikeModel.findOneAndUpdate(
      { id },
      { ...cleanUpdateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedTaskLike) {
      throw new Error('Task like not found');
    }

    return updatedTaskLike;
  }

  /**
   * Delete a task like
   */
  async delete(input: DeleteTaskLikeInput): Promise<TaskLike> {
    const taskLike = await this.taskLikeModel.findOne({ id: input.id }).exec();
    
    if (!taskLike) {
      throw new Error('Task like not found');
    }

    await this.taskLikeModel.deleteOne({ id: input.id }).exec();
    return taskLike;
  }

  /**
   * Get task like by ID
   */
  async getById(id: string): Promise<TaskLike> {
    const taskLike = await this.taskLikeModel.findOne({ id }).exec();
    if (!taskLike) {
      throw new Error('Task like not found');
    }
    return taskLike;
  }

  /**
   * Get task likes with pagination
   */
  async getWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: any
  ): Promise<TaskLikeConnection> {
    // TODO: Implement proper pagination logic
    const taskLikes = await this.taskLikeModel.find(where || {}).exec();
    
    return {
      totalCount: taskLikes.length,
      edges: taskLikes.map((taskLike, index) => ({
        node: taskLike,
        cursor: `cursor_${index}`,
      })),
    };
  }
}
