import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskActivity, TaskActivityDocument } from '../../database/schemas/task-activity.schema';
import { 
  CreateTaskActivityInput, 
  UpdateTaskActivityInput,
  TaskActivityConnection
} from '../../shared/dto/task-activity.dto';

/**
 * TaskActivity service for task activity operations
 */
@Injectable()
export class TaskActivityService {
  constructor(
    @InjectModel(TaskActivity.name)
    private readonly taskActivityModel: Model<TaskActivityDocument>,
  ) {}

  /**
   * Create a new task activity
   */
  async create(input: CreateTaskActivityInput): Promise<TaskActivity> {
    const taskActivity = new this.taskActivityModel(input);
    const saved = await taskActivity.save();
    return saved;
  }

  /**
   * Update a task activity
   */
  async update(input: UpdateTaskActivityInput): Promise<TaskActivity> {
    const { id, ...updateData } = input;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const updatedActivity = await this.taskActivityModel.findOneAndUpdate(
      { id },
      { ...cleanUpdateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedActivity) {
      throw new Error('Task activity not found');
    }

    return updatedActivity;
  }

  /**
   * Get task activity by ID
   */
  async getById(id: string): Promise<TaskActivity> {
    const activity = await this.taskActivityModel.findOne({ id }).exec();
    if (!activity) {
      throw new Error('Task activity not found');
    }
    return activity;
  }

  /**
   * Get task activities with pagination
   */
  async getWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: any
  ): Promise<TaskActivityConnection> {
    // TODO: Implement proper pagination logic
    const activities = await this.taskActivityModel.find(where || {}).exec();
    
    return {
      totalCount: activities.length,
      edges: activities.map((activity, index) => ({
        node: activity,
        cursor: `cursor_${index}`,
      })),
    };
  }
}
