import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskFeedLike, TaskFeedLikeDocument } from '../../database/schemas/task-feed-like.schema';
import { 
  CreateTaskFeedLikeInput, 
  UpdateTaskFeedLikeInput, 
  DeleteTaskFeedLikeInput,
  TaskFeedLikeConnection
} from '../../shared/dto/task-feed-like.dto';

/**
 * TaskFeedLike service for task feed like operations
 */
@Injectable()
export class TaskFeedLikeService {
  constructor(
    @InjectModel(TaskFeedLike.name)
    private readonly taskFeedLikeModel: Model<TaskFeedLikeDocument>,
  ) {}

  /**
   * Create a new task feed like
   */
  async create(input: CreateTaskFeedLikeInput): Promise<TaskFeedLike> {
    const taskFeedLike = new this.taskFeedLikeModel(input);
    const saved = await taskFeedLike.save();
    return saved;
  }

  /**
   * Update a task feed like
   */
  async update(input: UpdateTaskFeedLikeInput): Promise<TaskFeedLike> {
    const { id, ...updateData } = input;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const updatedTaskFeedLike = await this.taskFeedLikeModel.findOneAndUpdate(
      { id },
      { ...cleanUpdateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedTaskFeedLike) {
      throw new Error('Task feed like not found');
    }

    return updatedTaskFeedLike;
  }

  /**
   * Delete a task feed like
   */
  async delete(input: DeleteTaskFeedLikeInput): Promise<TaskFeedLike> {
    const taskFeedLike = await this.taskFeedLikeModel.findOne({ id: input.id }).exec();
    
    if (!taskFeedLike) {
      throw new Error('Task feed like not found');
    }

    await this.taskFeedLikeModel.deleteOne({ id: input.id }).exec();
    return taskFeedLike;
  }

  /**
   * Get task feed like by ID
   */
  async getById(id: string): Promise<TaskFeedLike> {
    const taskFeedLike = await this.taskFeedLikeModel.findOne({ id }).exec();
    if (!taskFeedLike) {
      throw new Error('Task feed like not found');
    }
    return taskFeedLike;
  }

  /**
   * Get task feed likes with pagination
   */
  async getWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: any
  ): Promise<TaskFeedLikeConnection> {
    // TODO: Implement proper pagination logic
    const taskFeedLikes = await this.taskFeedLikeModel.find(where || {}).exec();
    
    return {
      totalCount: taskFeedLikes.length,
      edges: taskFeedLikes.map((taskFeedLike, index) => ({
        node: taskFeedLike,
        cursor: `cursor_${index}`,
      })),
    };
  }
}
