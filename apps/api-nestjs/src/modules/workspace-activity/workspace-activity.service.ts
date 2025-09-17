import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WorkspaceActivity, WorkspaceActivityDocument } from '../../database/schemas/workspace-activity.schema';
import { 
  CreateWorkspaceActivityInput, 
  UpdateWorkspaceActivityInput,
  WorkspaceActivityConnection
} from '../../shared/dto/workspace-activity.dto';

/**
 * WorkspaceActivity service for workspace activity operations
 */
@Injectable()
export class WorkspaceActivityService {
  constructor(
    @InjectModel(WorkspaceActivity.name)
    private readonly workspaceActivityModel: Model<WorkspaceActivityDocument>,
  ) {}

  /**
   * Create a new workspace activity
   */
  async create(input: CreateWorkspaceActivityInput): Promise<WorkspaceActivity> {
    const workspaceActivity = new this.workspaceActivityModel({
      ...input,
      workspaceId: '', // TODO: Get from context
      projectId: '', // TODO: Get from context
    });
    const saved = await workspaceActivity.save();
    return saved;
  }

  /**
   * Update a workspace activity
   */
  async update(input: UpdateWorkspaceActivityInput): Promise<WorkspaceActivity> {
    const { id, ...updateData } = input;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const updatedActivity = await this.workspaceActivityModel.findOneAndUpdate(
      { id },
      { ...cleanUpdateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedActivity) {
      throw new Error('Workspace activity not found');
    }

    return updatedActivity;
  }

  /**
   * Get workspace activity by ID
   */
  async getById(id: string): Promise<WorkspaceActivity> {
    const activity = await this.workspaceActivityModel.findOne({ id }).exec();
    if (!activity) {
      throw new Error('Workspace activity not found');
    }
    return activity;
  }

  /**
   * Get workspace activities with pagination
   */
  async getWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: any
  ): Promise<WorkspaceActivityConnection> {
    // TODO: Implement proper pagination logic
    const activities = await this.workspaceActivityModel.find(where || {}).exec();
    
    return {
      totalCount: activities.length,
      edges: activities.map((activity, index) => ({
        node: activity,
        cursor: `cursor_${index}`,
      })),
    };
  }
}
