import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectLightColor, ProjectLightColorDocument } from '../../database/schemas/project-light-color.schema';
import { 
  CreateProjectLightColorInput, 
  UpdateProjectLightColorInput,
  ProjectLightColorConnection
} from '../../shared/dto/project-light-color.dto';

/**
 * ProjectLightColor service for project light color operations
 */
@Injectable()
export class ProjectLightColorService {
  constructor(
    @InjectModel(ProjectLightColor.name)
    private readonly projectLightColorModel: Model<ProjectLightColorDocument>,
  ) {}

  /**
   * Create a new project light color
   */
  async create(input: CreateProjectLightColorInput): Promise<ProjectLightColor> {
    const projectLightColor = new this.projectLightColorModel(input);
    const saved = await projectLightColor.save();
    return saved;
  }

  /**
   * Update a project light color
   */
  async update(input: UpdateProjectLightColorInput): Promise<ProjectLightColor> {
    const { id, ...updateData } = input;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const updatedProjectLightColor = await this.projectLightColorModel.findOneAndUpdate(
      { id },
      { ...cleanUpdateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedProjectLightColor) {
      throw new Error('Project light color not found');
    }

    return updatedProjectLightColor;
  }

  /**
   * Get project light color by ID
   */
  async getById(id: string): Promise<ProjectLightColor> {
    const projectLightColor = await this.projectLightColorModel.findOne({ id }).exec();
    if (!projectLightColor) {
      throw new Error('Project light color not found');
    }
    return projectLightColor;
  }

  /**
   * Get project light color by where clause
   */
  async get(where: any): Promise<ProjectLightColor | null> {
    // TODO: Implement where clause filtering
    return this.projectLightColorModel.findOne(where || {}).exec();
  }

  /**
   * Get project light colors with pagination
   */
  async getWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: any
  ): Promise<ProjectLightColorConnection> {
    // TODO: Implement proper pagination logic
    const projectLightColors = await this.projectLightColorModel.find(where || {}).exec();
    
    return {
      totalCount: projectLightColors.length,
      edges: projectLightColors.map((projectLightColor, index) => ({
        node: projectLightColor,
        cursor: `cursor_${index}`,
      })),
    };
  }
}
