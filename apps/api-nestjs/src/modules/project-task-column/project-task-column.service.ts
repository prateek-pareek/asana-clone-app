import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectTaskColumn, ProjectTaskColumnDocument } from '../../database/schemas/project-task-column.schema';
import { 
  CreateProjectTaskColumnInput, 
  UpdateProjectTaskColumnInput,
  ProjectTaskColumnConnection
} from '../../shared/dto/project-task-column.dto';

/**
 * ProjectTaskColumn service for project task column operations
 */
@Injectable()
export class ProjectTaskColumnService {
  constructor(
    @InjectModel(ProjectTaskColumn.name)
    private readonly projectTaskColumnModel: Model<ProjectTaskColumnDocument>,
  ) {}

  /**
   * Create a new project task column
   */
  async create(input: CreateProjectTaskColumnInput): Promise<ProjectTaskColumn> {
    const projectTaskColumn = new this.projectTaskColumnModel(input);
    const saved = await projectTaskColumn.save();
    return saved;
  }

  /**
   * Update a project task column
   */
  async update(input: UpdateProjectTaskColumnInput): Promise<ProjectTaskColumn> {
    const { id, ...updateData } = input;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const updatedProjectTaskColumn = await this.projectTaskColumnModel.findOneAndUpdate(
      { id },
      { ...cleanUpdateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedProjectTaskColumn) {
      throw new Error('Project task column not found');
    }

    return updatedProjectTaskColumn;
  }

  /**
   * Get project task column by ID
   */
  async getById(id: string): Promise<ProjectTaskColumn> {
    const projectTaskColumn = await this.projectTaskColumnModel.findOne({ id }).exec();
    if (!projectTaskColumn) {
      throw new Error('Project task column not found');
    }
    return projectTaskColumn;
  }

  /**
   * Get project task column by where clause
   */
  async get(where: any): Promise<ProjectTaskColumn | null> {
    // TODO: Implement where clause filtering
    return this.projectTaskColumnModel.findOne(where || {}).exec();
  }

  /**
   * Get project task columns with pagination
   */
  async getWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: any
  ): Promise<ProjectTaskColumnConnection> {
    // TODO: Implement proper pagination logic
    const projectTaskColumns = await this.projectTaskColumnModel.find(where || {}).exec();
    
    return {
      totalCount: projectTaskColumns.length,
      edges: projectTaskColumns.map((projectTaskColumn, index) => ({
        node: projectTaskColumn,
        cursor: `cursor_${index}`,
      })),
    };
  }
}
