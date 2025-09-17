import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FavoriteProject, FavoriteProjectDocument } from '../../database/schemas/favorite-project.schema';
import { 
  CreateFavoriteProjectInput, 
  DeleteFavoriteProjectInput,
  FavoriteProjectConnection
} from '../../shared/dto/favorite-project.dto';

/**
 * FavoriteProject service for favorite project operations
 */
@Injectable()
export class FavoriteProjectService {
  constructor(
    @InjectModel(FavoriteProject.name)
    private readonly favoriteProjectModel: Model<FavoriteProjectDocument>,
  ) {}

  /**
   * Create a new favorite project
   */
  async create(input: CreateFavoriteProjectInput): Promise<FavoriteProject> {
    const favoriteProject = new this.favoriteProjectModel(input);
    const saved = await favoriteProject.save();
    return saved;
  }

  /**
   * Delete a favorite project
   */
  async delete(input: DeleteFavoriteProjectInput): Promise<FavoriteProject> {
    const favoriteProject = await this.favoriteProjectModel.findOne({ 
      projectId: input.projectId, 
      teammateId: input.teammateId 
    }).exec();
    
    if (!favoriteProject) {
      throw new Error('Favorite project not found');
    }

    await this.favoriteProjectModel.deleteOne({ 
      projectId: input.projectId, 
      teammateId: input.teammateId 
    }).exec();

    return favoriteProject;
  }

  /**
   * Get favorite project by ID
   */
  async getById(id: string): Promise<FavoriteProject> {
    const favoriteProject = await this.favoriteProjectModel.findOne({ id }).exec();
    if (!favoriteProject) {
      throw new Error('Favorite project not found');
    }
    return favoriteProject;
  }

  /**
   * Get favorite projects with pagination
   */
  async getWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: any
  ): Promise<FavoriteProjectConnection> {
    // TODO: Implement proper pagination logic
    const favoriteProjects = await this.favoriteProjectModel.find(where || {}).exec();
    
    return {
      totalCount: favoriteProjects.length,
      edges: favoriteProjects.map((favoriteProject, index) => ({
        node: favoriteProject,
        cursor: `cursor_${index}`,
      })),
    };
  }

  /**
   * Get favorite project IDs for a teammate
   */
  async getFavoriteProjectIds(teammateId: string): Promise<string[]> {
    const favoriteProjects = await this.favoriteProjectModel.find({ teammateId }).exec();
    return favoriteProjects.map(fp => fp.projectId);
  }
}
