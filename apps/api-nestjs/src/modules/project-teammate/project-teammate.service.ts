import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectTeammate, ProjectTeammateDocument } from '../../database/schemas/project-teammate.schema';
import { 
  CreateProjectTeammateInput, 
  UpdateProjectTeammateInput, 
  UpdateProjectTeammateOwnerInput,
  ProjectTeammateConnection
} from '../../shared/dto/project-teammate.dto';

/**
 * ProjectTeammate service for project teammate operations
 */
@Injectable()
export class ProjectTeammateService {
  constructor(
    @InjectModel(ProjectTeammate.name)
    private readonly projectTeammateModel: Model<ProjectTeammateDocument>,
  ) {}

  /**
   * Create a new project teammate
   */
  async create(input: CreateProjectTeammateInput): Promise<ProjectTeammate> {
    const projectTeammate = new this.projectTeammateModel(input);
    const saved = await projectTeammate.save();
    return saved;
  }

  /**
   * Update a project teammate
   */
  async update(input: UpdateProjectTeammateInput): Promise<ProjectTeammate> {
    const { id, ...updateData } = input;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const updatedProjectTeammate = await this.projectTeammateModel.findOneAndUpdate(
      { id },
      { ...cleanUpdateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedProjectTeammate) {
      throw new Error('Project teammate not found');
    }

    return updatedProjectTeammate;
  }

  /**
   * Update project teammate owner
   */
  async updateOwner(input: UpdateProjectTeammateOwnerInput): Promise<ProjectTeammate> {
    // Find the current owner and remove ownership
    await this.projectTeammateModel.updateMany(
      { projectId: input.projectId, isOwner: true },
      { isOwner: false, updatedAt: new Date() }
    ).exec();

    // Set new owner
    const updatedProjectTeammate = await this.projectTeammateModel.findOneAndUpdate(
      { projectId: input.projectId, teammateId: input.teammateId },
      { isOwner: true, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedProjectTeammate) {
      throw new Error('Project teammate not found');
    }

    return updatedProjectTeammate;
  }

  /**
   * Get project teammate by ID
   */
  async getById(id: string): Promise<ProjectTeammate> {
    const projectTeammate = await this.projectTeammateModel.findOne({ id }).exec();
    if (!projectTeammate) {
      throw new Error('Project teammate not found');
    }
    return projectTeammate;
  }

  /**
   * Get project teammates with pagination
   */
  async getWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: any
  ): Promise<ProjectTeammateConnection> {
    // TODO: Implement proper pagination logic
    const projectTeammates = await this.projectTeammateModel.find(where || {}).exec();
    
    return {
      totalCount: projectTeammates.length,
      edges: projectTeammates.map((projectTeammate, index) => ({
        node: projectTeammate,
        cursor: `cursor_${index}`,
      })),
    };
  }
}
