import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WorkspaceTeammate, WorkspaceTeammateDocument } from '../../database/schemas/workspace-teammate.schema';
import { 
  CreateWorkspaceTeammateInput, 
  UpdateWorkspaceTeammateInput, 
  WorkspaceTeammateConnection
} from '../../shared/dto/workspace-teammate.dto';

/**
 * WorkspaceTeammate service for workspace teammate operations
 */
@Injectable()
export class WorkspaceTeammateService {
  constructor(
    @InjectModel(WorkspaceTeammate.name)
    private readonly workspaceTeammateModel: Model<WorkspaceTeammateDocument>,
  ) {}

  /**
   * Create a new workspace teammate
   */
  async create(input: CreateWorkspaceTeammateInput): Promise<WorkspaceTeammate> {
    const workspaceTeammate = new this.workspaceTeammateModel(input);
    const saved = await workspaceTeammate.save();
    return saved;
  }

  /**
   * Update a workspace teammate
   */
  async update(input: UpdateWorkspaceTeammateInput): Promise<WorkspaceTeammate> {
    const { id, ...updateData } = input;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const updatedWorkspaceTeammate = await this.workspaceTeammateModel.findOneAndUpdate(
      { id },
      { ...cleanUpdateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedWorkspaceTeammate) {
      throw new Error('Workspace teammate not found');
    }

    return updatedWorkspaceTeammate;
  }

  /**
   * Get workspace teammate by ID
   */
  async getById(id: string): Promise<WorkspaceTeammate> {
    const workspaceTeammate = await this.workspaceTeammateModel.findOne({ id }).exec();
    if (!workspaceTeammate) {
      throw new Error('Workspace teammate not found');
    }
    return workspaceTeammate;
  }

  /**
   * Get workspace teammates with pagination
   */
  async getWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: any
  ): Promise<WorkspaceTeammateConnection> {
    // TODO: Implement proper pagination logic
    const workspaceTeammates = await this.workspaceTeammateModel.find(where || {}).exec();
    
    return {
      totalCount: workspaceTeammates.length,
      edges: workspaceTeammates.map((workspaceTeammate, index) => ({
        node: workspaceTeammate,
        cursor: `cursor_${index}`,
      })),
    };
  }
}
