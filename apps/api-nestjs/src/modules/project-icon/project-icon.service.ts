import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectIcon, ProjectIconDocument } from '../../database/schemas/project-icon.schema';
import { 
  CreateProjectIconInput, 
  UpdateProjectIconInput,
  ProjectIconConnection
} from '../../shared/dto/project-icon.dto';

/**
 * ProjectIcon service for project icon operations
 */
@Injectable()
export class ProjectIconService {
  constructor(
    @InjectModel(ProjectIcon.name)
    private readonly projectIconModel: Model<ProjectIconDocument>,
  ) {}

  /**
   * Create a new project icon
   */
  async create(input: CreateProjectIconInput): Promise<ProjectIcon> {
    const projectIcon = new this.projectIconModel(input);
    const saved = await projectIcon.save();
    return saved;
  }

  /**
   * Update a project icon
   */
  async update(input: UpdateProjectIconInput): Promise<ProjectIcon> {
    const { id, ...updateData } = input;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const updatedProjectIcon = await this.projectIconModel.findOneAndUpdate(
      { id },
      { ...cleanUpdateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedProjectIcon) {
      throw new Error('Project icon not found');
    }

    return updatedProjectIcon;
  }

  /**
   * Get project icon by ID
   */
  async getById(id: string): Promise<ProjectIcon> {
    const projectIcon = await this.projectIconModel.findOne({ id }).exec();
    if (!projectIcon) {
      throw new Error('Project icon not found');
    }
    return projectIcon;
  }

  /**
   * Get project icon by where clause
   */
  async get(where: any): Promise<ProjectIcon | null> {
    // TODO: Implement where clause filtering
    return this.projectIconModel.findOne(where || {}).exec();
  }

  /**
   * Get project icons with pagination
   */
  async getWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: any
  ): Promise<ProjectIconConnection> {
    // TODO: Implement proper pagination logic
    const projectIcons = await this.projectIconModel.find(where || {}).exec();
    
    return {
      totalCount: projectIcons.length,
      edges: projectIcons.map((projectIcon, index) => ({
        node: projectIcon,
        cursor: `cursor_${index}`,
      })),
    };
  }
}
