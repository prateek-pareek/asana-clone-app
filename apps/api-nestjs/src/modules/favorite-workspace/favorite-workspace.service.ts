import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FavoriteWorkspace, FavoriteWorkspaceDocument } from '../../database/schemas/favorite-workspace.schema';
import { 
  CreateFavoriteWorkspaceInput, 
  DeleteFavoriteWorkspaceInput,
  FavoriteWorkspaceConnection
} from '../../shared/dto/favorite-workspace.dto';

/**
 * FavoriteWorkspace service for favorite workspace operations
 */
@Injectable()
export class FavoriteWorkspaceService {
  constructor(
    @InjectModel(FavoriteWorkspace.name)
    private readonly favoriteWorkspaceModel: Model<FavoriteWorkspaceDocument>,
  ) {}

  /**
   * Create a new favorite workspace
   */
  async create(input: CreateFavoriteWorkspaceInput): Promise<FavoriteWorkspace> {
    const favoriteWorkspace = new this.favoriteWorkspaceModel(input);
    const saved = await favoriteWorkspace.save();
    return saved;
  }

  /**
   * Delete a favorite workspace
   */
  async delete(input: DeleteFavoriteWorkspaceInput): Promise<FavoriteWorkspace> {
    const favoriteWorkspace = await this.favoriteWorkspaceModel.findOne({ 
      workspaceId: input.workspaceId, 
      teammateId: input.teammateId 
    }).exec();
    
    if (!favoriteWorkspace) {
      throw new Error('Favorite workspace not found');
    }

    await this.favoriteWorkspaceModel.deleteOne({ 
      workspaceId: input.workspaceId, 
      teammateId: input.teammateId 
    }).exec();

    return favoriteWorkspace;
  }

  /**
   * Get favorite workspace by ID
   */
  async getById(id: string): Promise<FavoriteWorkspace> {
    const favoriteWorkspace = await this.favoriteWorkspaceModel.findOne({ id }).exec();
    if (!favoriteWorkspace) {
      throw new Error('Favorite workspace not found');
    }
    return favoriteWorkspace;
  }

  /**
   * Get favorite workspaces with pagination
   */
  async getWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: any
  ): Promise<FavoriteWorkspaceConnection> {
    // TODO: Implement proper pagination logic
    const favoriteWorkspaces = await this.favoriteWorkspaceModel.find(where || {}).exec();
    
    return {
      totalCount: favoriteWorkspaces.length,
      edges: favoriteWorkspaces.map((favoriteWorkspace, index) => ({
        node: favoriteWorkspace,
        cursor: `cursor_${index}`,
      })),
    };
  }

  /**
   * Get favorite workspace IDs for a teammate
   */
  async getFavoriteWorkspaceIds(teammateId: string, workspaceId?: string): Promise<string[]> {
    const query: any = { teammateId };
    if (workspaceId) {
      query.workspaceId = workspaceId;
    }
    
    const favoriteWorkspaces = await this.favoriteWorkspaceModel.find(query).exec();
    return favoriteWorkspaces.map(fw => fw.workspaceId);
  }
}
