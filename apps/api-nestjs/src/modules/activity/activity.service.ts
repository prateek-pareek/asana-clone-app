import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activity, ActivityDocument } from '../../database/schemas/activity.schema';

/**
 * Activity service for activity operations
 */
@Injectable()
export class ActivityService {
  constructor(
    @InjectModel(Activity.name)
    private readonly activityModel: Model<ActivityDocument>,
  ) {}

  /**
   * Get activity by ID
   */
  async getById(id: string): Promise<Activity> {
    const activity = await this.activityModel.findOne({ id }).exec();
    if (!activity) {
      throw new Error('Activity not found');
    }
    return activity;
  }

  /**
   * List all activities
   */
  async list(): Promise<Activity[]> {
    return this.activityModel.find().exec();
  }

  /**
   * Create activity
   */
  async create(input: any): Promise<Activity> {
    const activity = new this.activityModel({
      id: this.generateId(),
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    return activity.save();
  }

  /**
   * Update activity
   */
  async update(input: any): Promise<Activity> {
    const { id, ...updateData } = input;
    
    const updatedActivity = await this.activityModel.findOneAndUpdate(
      { id },
      { ...updateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedActivity) {
      throw new Error('Activity not found');
    }

    return updatedActivity;
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
