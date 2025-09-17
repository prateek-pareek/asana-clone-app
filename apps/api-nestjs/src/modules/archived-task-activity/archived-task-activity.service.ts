import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArchivedTaskActivity, ArchivedTaskActivityDocument } from '../../database/schemas/archived-task-activity.schema';
import { 
  CreateArchivedTaskActivityInput, 
  UpdateArchivedTaskActivityInput,
  ArchivedTaskActivityConnection
} from '../../shared/dto/archived-task-activity.dto';

/**
 * ArchivedTaskActivity service for archived task activity operations
 */
@Injectable()
export class ArchivedTaskActivityService {
  constructor(
    @InjectModel(ArchivedTaskActivity.name)
    private readonly archivedTaskActivityModel: Model<ArchivedTaskActivityDocument>,
  ) {}

  /**
   * Create a new archived task activity
   */
  async create(input: CreateArchivedTaskActivityInput): Promise<ArchivedTaskActivity> {
    const archivedTaskActivity = new this.archivedTaskActivityModel(input);
    const saved = await archivedTaskActivity.save();
    return saved;
  }

  /**
   * Update an archived task activity
   */
  async update(input: UpdateArchivedTaskActivityInput): Promise<ArchivedTaskActivity> {
    const { id, ...updateData } = input;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const updatedArchivedTaskActivity = await this.archivedTaskActivityModel.findOneAndUpdate(
      { id },
      { ...cleanUpdateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedArchivedTaskActivity) {
      throw new Error('Archived task activity not found');
    }

    return updatedArchivedTaskActivity;
  }

  /**
   * Get archived task activity by ID
   */
  async getById(id: string): Promise<ArchivedTaskActivity> {
    const archivedTaskActivity = await this.archivedTaskActivityModel.findOne({ id }).exec();
    if (!archivedTaskActivity) {
      throw new Error('Archived task activity not found');
    }
    return archivedTaskActivity;
  }

  /**
   * Get archived task activity by where clause
   */
  async get(where: any): Promise<ArchivedTaskActivity | null> {
    // TODO: Implement where clause filtering
    return this.archivedTaskActivityModel.findOne(where || {}).exec();
  }

  /**
   * Get archived task activities with pagination
   */
  async getWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: any
  ): Promise<ArchivedTaskActivityConnection> {
    // TODO: Implement proper pagination logic
    const archivedTaskActivities = await this.archivedTaskActivityModel.find(where || {}).exec();
    
    return {
      totalCount: archivedTaskActivities.length,
      edges: archivedTaskActivities.map((archivedTaskActivity, index) => ({
        node: archivedTaskActivity,
        cursor: `cursor_${index}`,
      })),
    };
  }
}
