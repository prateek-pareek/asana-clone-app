import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActivityType, ActivityTypeDocument } from '../../database/schemas/activity-type.schema';
import { 
  CreateActivityTypeInput, 
  UpdateActivityTypeInput, 
  ActivityTypeConnection
} from '../../shared/dto/activity-type.dto';

/**
 * ActivityType service for activity type operations
 */
@Injectable()
export class ActivityTypeService {
  constructor(
    @InjectModel(ActivityType.name)
    private readonly activityTypeModel: Model<ActivityTypeDocument>,
  ) {}

  /**
   * Create a new activity type
   */
  async create(input: CreateActivityTypeInput): Promise<ActivityType> {
    const activityType = new this.activityTypeModel(input);
    const saved = await activityType.save();
    return saved;
  }

  /**
   * Update an activity type
   */
  async update(input: UpdateActivityTypeInput): Promise<ActivityType> {
    const { id, ...updateData } = input;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const updatedActivityType = await this.activityTypeModel.findOneAndUpdate(
      { id },
      { ...cleanUpdateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedActivityType) {
      throw new Error('Activity type not found');
    }

    return updatedActivityType;
  }

  /**
   * Get activity type by ID
   */
  async getById(id: string): Promise<ActivityType> {
    const activityType = await this.activityTypeModel.findOne({ id }).exec();
    if (!activityType) {
      throw new Error('Activity type not found');
    }
    return activityType;
  }

  /**
   * Get activity types with pagination
   */
  async getWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: any
  ): Promise<ActivityTypeConnection> {
    // TODO: Implement proper pagination logic
    const activityTypes = await this.activityTypeModel.find(where || {}).exec();
    
    return {
      totalCount: activityTypes.length,
      edges: activityTypes.map((activityType, index) => ({
        node: activityType,
        cursor: `cursor_${index}`,
      })),
    };
  }
}
