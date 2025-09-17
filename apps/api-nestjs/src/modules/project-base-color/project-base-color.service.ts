import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectBaseColor, ProjectBaseColorDocument } from '../../database/schemas/project-base-color.schema';
import { 
  CreateProjectBaseColorInput, 
  UpdateProjectBaseColorInput,
  ProjectBaseColorConnection
} from '../../shared/dto/project-base-color.dto';

/**
 * ProjectBaseColor service for project base color operations
 */
@Injectable()
export class ProjectBaseColorService {
  constructor(
    @InjectModel(ProjectBaseColor.name)
    private readonly projectBaseColorModel: Model<ProjectBaseColorDocument>,
  ) {}

  /**
   * Create a new project base color
   */
  async create(input: CreateProjectBaseColorInput): Promise<ProjectBaseColor> {
    const projectBaseColor = new this.projectBaseColorModel(input);
    const saved = await projectBaseColor.save();
    return saved;
  }

  /**
   * Update a project base color
   */
  async update(input: UpdateProjectBaseColorInput): Promise<ProjectBaseColor> {
    const { id, ...updateData } = input;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const updatedProjectBaseColor = await this.projectBaseColorModel.findOneAndUpdate(
      { id },
      { ...cleanUpdateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedProjectBaseColor) {
      throw new Error('Project base color not found');
    }

    return updatedProjectBaseColor;
  }

  /**
   * Get project base color by ID
   */
  async getById(id: string): Promise<ProjectBaseColor> {
    const projectBaseColor = await this.projectBaseColorModel.findOne({ id }).exec();
    if (!projectBaseColor) {
      throw new Error('Project base color not found');
    }
    return projectBaseColor;
  }

  /**
   * Get project base color by where clause
   */
  async get(where: any): Promise<ProjectBaseColor | null> {
    // TODO: Implement where clause filtering
    return this.projectBaseColorModel.findOne(where || {}).exec();
  }

  /**
   * Get project base colors with pagination
   */
  async getWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: any
  ): Promise<ProjectBaseColorConnection> {
    // TODO: Implement proper pagination logic
    const projectBaseColors = await this.projectBaseColorModel.find(where || {}).exec();
    
    return {
      totalCount: projectBaseColors.length,
      edges: projectBaseColors.map((projectBaseColor, index) => ({
        node: projectBaseColor,
        cursor: `cursor_${index}`,
      })),
    };
  }
}
