import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Workspace, WorkspaceDocument } from '../../database/schemas/workspace.schema';
import { CreateWorkspaceInput, UpdateWorkspaceInput, WorkspaceConnection } from '../../shared/dto/workspace.dto';
import { WorkspaceWhereInput } from '../../shared/dto/where-inputs/workspace-where-input.dto';
import { WhereClauseService } from '../../shared/services/where-clause.service';
import { PaginationService, PaginationOptions } from '../../shared/services/pagination.service';
import { PubSubService } from '../../shared/services/pub-sub.service';
import { ErrorFactory, DatabaseError, NotFoundError } from '../../shared/errors/custom-errors';

/**
 * Workspace service for workspace operations
 */
@Injectable()
export class WorkspaceService {
  constructor(
    @InjectModel(Workspace.name)
    private readonly workspaceModel: Model<WorkspaceDocument>,
    private readonly whereClauseService: WhereClauseService,
    private readonly paginationService: PaginationService,
    private readonly pubSubService: PubSubService,
  ) {}

  /**
   * Get workspace by where input
   */
  async get(where: WorkspaceWhereInput): Promise<Workspace | null> {
    try {
      const filter = this.whereClauseService.buildWorkspaceFilter(where);
      
      const workspace = await this.workspaceModel
        .findOne(filter)
        .populate('workspaceTeammates.teammate')
        .populate('projects')
        .populate('workspaceActivities')
        .populate('favoriteWorkspaces')
        .exec();
      
      return workspace;
    } catch (error) {
      throw ErrorFactory.newDBError(error as Error);
    }
  }

  /**
   * List all workspaces
   */
  async list(): Promise<Workspace[]> {
    try {
      return await this.workspaceModel
        .find()
        .populate('workspaceTeammates.teammate')
        .populate('projects')
        .populate('workspaceActivities')
        .populate('favoriteWorkspaces')
        .exec();
    } catch (error) {
      throw ErrorFactory.newDBError(error as Error);
    }
  }

  /**
   * List workspaces with pagination
   */
  async listWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: WorkspaceWhereInput
  ): Promise<WorkspaceConnection> {
    try {
      const filter = where ? this.whereClauseService.buildWorkspaceFilter(where) : {};
      
      const paginationOptions: PaginationOptions = {
        after,
        first,
        before,
        last
      };

      const result = await this.paginationService.paginate(
        this.workspaceModel,
        filter,
        paginationOptions,
        'createdAt',
        'desc'
      );

      // Populate relationships for each workspace
      const populatedWorkspaces = await Promise.all(
        result.edges.map(async (edge) => {
          const populatedWorkspace = await this.workspaceModel
            .findById(edge.node._id)
            .populate('workspaceTeammates.teammate')
            .populate('projects')
            .populate('workspaceActivities')
            .populate('favoriteWorkspaces')
            .exec();
          
          return {
            node: populatedWorkspace || edge.node,
            cursor: edge.cursor
          };
        })
      );

      return {
        totalCount: result.totalCount,
        edges: populatedWorkspaces,
        pageInfo: result.pageInfo
      };
    } catch (error) {
      throw ErrorFactory.newDBError(error as Error);
    }
  }

  /**
   * Create workspace
   */
  async create(input: CreateWorkspaceInput): Promise<Workspace> {
    try {
      const workspace = new this.workspaceModel({
        id: this.generateId(),
        ...input,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      
      const savedWorkspace = await workspace.save();
      
      // Publish workspace created event
      await this.pubSubService.publish('WORKSPACE_CREATED', {
        workspaceCreated: savedWorkspace,
        requestId: input.requestId || 'unknown'
      });
      
      return savedWorkspace;
    } catch (error) {
      throw ErrorFactory.newDBError(error as Error);
    }
  }

  /**
   * Update workspace
   */
  async update(input: UpdateWorkspaceInput): Promise<Workspace> {
    try {
      const { id, ...updateData } = input;
      
      const updatedWorkspace = await this.workspaceModel.findOneAndUpdate(
        { id },
        { ...updateData, updatedAt: new Date().toISOString() },
        { new: true }
      ).exec();

      if (!updatedWorkspace) {
        throw ErrorFactory.newNotFoundError(new Error('Workspace not found'), { id });
      }

      // Publish workspace updated event
      await this.pubSubService.publish('WORKSPACE_UPDATED', {
        workspaceUpdated: updatedWorkspace,
        requestId: input.requestId || 'unknown'
      });

      return updatedWorkspace;
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        throw error; // Re-throw NotFoundError
      }
      throw ErrorFactory.newDBError(error as Error);
    }
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
