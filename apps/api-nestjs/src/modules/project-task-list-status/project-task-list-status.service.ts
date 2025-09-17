import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectTaskListStatus, ProjectTaskListStatusDocument } from '../../database/schemas/project-task-list-status.schema';
import { 
  CreateProjectTaskListStatusInput, 
  UpdateProjectTaskListStatusInput,
  ProjectTaskListStatusConnection
} from '../../shared/dto/project-task-list-status.dto';

/**
 * ProjectTaskListStatus service for project task list status operations
 */
@Injectable()
export class ProjectTaskListStatusService {
  constructor(
    @InjectModel(ProjectTaskListStatus.name)
    private readonly projectTaskListStatusModel: Model<ProjectTaskListStatusDocument>,
  ) {}

  /**
   * Create a new project task list status
   */
  async create(input: CreateProjectTaskListStatusInput): Promise<ProjectTaskListStatus> {
    const projectTaskListStatus = new this.projectTaskListStatusModel(input);
    const saved = await projectTaskListStatus.save();
    return saved;
  }

  /**
   * Update a project task list status
   */
  async update(input: UpdateProjectTaskListStatusInput): Promise<ProjectTaskListStatus> {
    const { id, ...updateData } = input;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const updatedProjectTaskListStatus = await this.projectTaskListStatusModel.findOneAndUpdate(
      { id },
      { ...cleanUpdateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedProjectTaskListStatus) {
      throw new Error('Project task list status not found');
    }

    return updatedProjectTaskListStatus;
  }

  /**
   * Get project task list status by ID
   */
  async getById(id: string): Promise<ProjectTaskListStatus> {
    const projectTaskListStatus = await this.projectTaskListStatusModel.findOne({ id }).exec();
    if (!projectTaskListStatus) {
      throw new Error('Project task list status not found');
    }
    return projectTaskListStatus;
  }

  /**
   * Get project task list status by where clause
   */
  async get(where: any): Promise<ProjectTaskListStatus | null> {
    // TODO: Implement where clause filtering
    return this.projectTaskListStatusModel.findOne(where || {}).exec();
  }

  /**
   * Get project task list statuses with pagination
   */
  async getWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: any
  ): Promise<ProjectTaskListStatusConnection> {
    // TODO: Implement proper pagination logic
    const projectTaskListStatuses = await this.projectTaskListStatusModel.find(where || {}).exec();
    
    return {
      totalCount: projectTaskListStatuses.length,
      edges: projectTaskListStatuses.map((projectTaskListStatus, index) => ({
        node: projectTaskListStatus,
        cursor: `cursor_${index}`,
      })),
    };
  }
}
