import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskFeed, TaskFeedDocument } from '../../database/schemas/task-feed.schema';
import { 
  CreateTaskFeedInput, 
  UpdateTaskFeedInput, 
  DeleteTaskFeedInput,
  UndeleteTaskFeedInput,
  TaskFeedConnection,
  DeleteTaskFeedPayload,
  UndeleteTaskFeedPayload
} from '../../shared/dto/task-feed.dto';

/**
 * TaskFeed service for task feed operations
 */
@Injectable()
export class TaskFeedService {
  constructor(
    @InjectModel(TaskFeed.name)
    private readonly taskFeedModel: Model<TaskFeedDocument>,
  ) {}

  /**
   * Create a new task feed
   */
  async create(input: CreateTaskFeedInput): Promise<TaskFeed> {
    const taskFeed = new this.taskFeedModel({
      ...input,
      isFirst: false,
      isPinned: false,
    });
    
    const saved = await taskFeed.save();
    return saved;
  }

  /**
   * Update a task feed
   */
  async update(input: UpdateTaskFeedInput): Promise<TaskFeed> {
    const { id, ...updateData } = input;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const updatedTaskFeed = await this.taskFeedModel.findOneAndUpdate(
      { id },
      { ...cleanUpdateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedTaskFeed) {
      throw new Error('Task feed not found');
    }

    return updatedTaskFeed;
  }

  /**
   * Delete a task feed
   */
  async delete(input: DeleteTaskFeedInput): Promise<DeleteTaskFeedPayload> {
    const taskFeed = await this.taskFeedModel.findOne({ id: input.id }).exec();
    
    if (!taskFeed) {
      throw new Error('Task feed not found');
    }

    await this.taskFeedModel.deleteOne({ id: input.id }).exec();

    return {
      taskFeed,
      taskFeedLikes: [], // TODO: Implement task feed likes deletion
      taskFiles: [], // TODO: Implement task files deletion
    };
  }

  /**
   * Undelete a task feed
   */
  async undelete(input: UndeleteTaskFeedInput): Promise<UndeleteTaskFeedPayload> {
    // Create new task feed from input data
    const taskFeed = new this.taskFeedModel({
      ...input.taskFeed,
      createdAt: new Date(input.taskFeed.createdAt),
      updatedAt: new Date(input.taskFeed.updatedAt),
    });

    const saved = await taskFeed.save();

    return {
      taskFeed: saved,
      taskFeedLikes: [], // TODO: Implement task feed likes restoration
      taskFiles: [], // TODO: Implement task files restoration
    };
  }

  /**
   * Get task feed by ID
   */
  async getById(id: string): Promise<TaskFeed> {
    const taskFeed = await this.taskFeedModel.findOne({ id }).exec();
    if (!taskFeed) {
      throw new Error('Task feed not found');
    }
    return taskFeed;
  }

  /**
   * Get task feeds with pagination
   */
  async getWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: any
  ): Promise<TaskFeedConnection> {
    // TODO: Implement proper pagination logic
    const taskFeeds = await this.taskFeedModel.find(where || {}).exec();
    
    return {
      totalCount: taskFeeds.length,
      edges: taskFeeds.map((taskFeed, index) => ({
        node: taskFeed,
        cursor: `cursor_${index}`,
      })),
    };
  }
}
