import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArchivedWorkspaceActivity, ArchivedWorkspaceActivityDocument } from '../../database/schemas/archived-workspace-activity.schema';
import { 
  CreateArchivedWorkspaceActivityInput, 
  UpdateArchivedWorkspaceActivityInput,
  ArchivedWorkspaceActivityConnection
} from '../../shared/dto/archived-workspace-activity.dto';

/**
 * ArchivedWorkspaceActivity service for archived workspace activity operations
 */
@Injectable()
export class ArchivedWorkspaceActivityService {
  constructor(
    @InjectModel(ArchivedWorkspaceActivity.name)
    private readonly archivedWorkspaceActivityModel: Model<ArchivedWorkspaceActivityDocument>,
  ) {}

  /**
   * Create a new archived workspace activity
   */
  async create(input: CreateArchivedWorkspaceActivityInput): Promise<ArchivedWorkspaceActivity> {
    const archivedWorkspaceActivity = new this.archivedWorkspaceActivityModel(input);
    const saved = await archivedWorkspaceActivity.save();
    return saved;
  }

  /**
   * Update an archived workspace activity
   */
  async update(input: UpdateArchivedWorkspaceActivityInput): Promise<ArchivedWorkspaceActivity> {
    const { id, ...updateData } = input;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const updatedArchivedWorkspaceActivity = await this.archivedWorkspaceActivityModel.findOneAndUpdate(
      { id },
      { ...cleanUpdateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedArchivedWorkspaceActivity) {
      throw new Error('Archived workspace activity not found');
    }

    return updatedArchivedWorkspaceActivity;
  }

  /**
   * Get archived workspace activity by ID
   */
  async getById(id: string): Promise<ArchivedWorkspaceActivity> {
    const archivedWorkspaceActivity = await this.archivedWorkspaceActivityModel.findOne({ id }).exec();
    if (!archivedWorkspaceActivity) {
      throw new Error('Archived workspace activity not found');
    }
    return archivedWorkspaceActivity;
  }

  /**
   * Get archived workspace activity by where clause
   */
  async get(where: any): Promise<ArchivedWorkspaceActivity | null> {
    // TODO: Implement where clause filtering
    return this.archivedWorkspaceActivityModel.findOne(where || {}).exec();
  }

  /**
   * Get archived workspace activities with pagination
   */
  async getWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: any
  ): Promise<ArchivedWorkspaceActivityConnection> {
    // TODO: Implement proper pagination logic
    const archivedWorkspaceActivities = await this.archivedWorkspaceActivityModel.find(where || {}).exec();
    
    return {
      totalCount: archivedWorkspaceActivities.length,
      edges: archivedWorkspaceActivities.map((archivedWorkspaceActivity, index) => ({
        node: archivedWorkspaceActivity,
        cursor: `cursor_${index}`,
      })),
    };
  }
}
