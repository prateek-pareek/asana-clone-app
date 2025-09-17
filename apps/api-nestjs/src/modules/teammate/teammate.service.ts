import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Teammate, TeammateDocument } from '../../database/schemas/teammate.schema';
import { CreateTeammateInput, UpdateTeammateInput, TeammateConnection } from '../../shared/dto/teammate.dto';
import { TeammateWhereInput } from '../../shared/dto/where-inputs/teammate-where-input.dto';
import { WhereClauseService } from '../../shared/services/where-clause.service';
import { PaginationService, PaginationOptions } from '../../shared/services/pagination.service';
import { PubSubService } from '../../shared/services/pub-sub.service';
import { ErrorFactory, DatabaseError, NotFoundError } from '../../shared/errors/custom-errors';

/**
 * Teammate service for teammate operations
 */
@Injectable()
export class TeammateService {
  constructor(
    @InjectModel(Teammate.name)
    private readonly teammateModel: Model<TeammateDocument>,
    private readonly whereClauseService: WhereClauseService,
    private readonly paginationService: PaginationService,
    private readonly pubSubService: PubSubService,
  ) {}

  /**
   * Get teammate by where input
   */
  async get(where: TeammateWhereInput): Promise<Teammate | null> {
    try {
      const filter = this.whereClauseService.buildTeammateFilter(where);
      
      const teammate = await this.teammateModel
        .findOne(filter)
        .populate('workspaceTeammates.workspace')
        .populate('projectTeammates.project')
        .populate('taskCollaborators.task')
        .populate('teammateTasks.task')
        .populate('teammateTaskSections')
        .populate('teammateTaskColumns')
        .populate('teammateTaskListStatuses')
        .populate('teammateTaskTabStatuses')
        .exec();
      
      return teammate;
    } catch (error) {
      throw ErrorFactory.newDBError(error as Error);
    }
  }

  /**
   * List all teammates
   */
  async list(): Promise<Teammate[]> {
    try {
      return await this.teammateModel
        .find()
        .populate('workspaceTeammates.workspace')
        .populate('projectTeammates.project')
        .populate('taskCollaborators.task')
        .populate('teammateTasks.task')
        .populate('teammateTaskSections')
        .populate('teammateTaskColumns')
        .populate('teammateTaskListStatuses')
        .populate('teammateTaskTabStatuses')
        .exec();
    } catch (error) {
      throw ErrorFactory.newDBError(error as Error);
    }
  }

  /**
   * List teammates with pagination
   */
  async listWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: TeammateWhereInput
  ): Promise<TeammateConnection> {
    try {
      const filter = where ? this.whereClauseService.buildTeammateFilter(where) : {};
      
      const paginationOptions: PaginationOptions = {
        after,
        first,
        before,
        last
      };

      const result = await this.paginationService.paginate(
        this.teammateModel,
        filter,
        paginationOptions,
        'createdAt',
        'desc'
      );

      // Populate relationships for each teammate
      const populatedTeammates = await Promise.all(
        result.edges.map(async (edge) => {
          const populatedTeammate = await this.teammateModel
            .findById(edge.node._id)
            .populate('workspaceTeammates.workspace')
            .populate('projectTeammates.project')
            .populate('taskCollaborators.task')
            .populate('teammateTasks.task')
            .populate('teammateTaskSections')
            .populate('teammateTaskColumns')
            .populate('teammateTaskListStatuses')
            .populate('teammateTaskTabStatuses')
            .exec();
          
          return {
            node: populatedTeammate || edge.node,
            cursor: edge.cursor
          };
        })
      );

      return {
        totalCount: result.totalCount,
        edges: populatedTeammates,
        pageInfo: result.pageInfo
      };
    } catch (error) {
      throw ErrorFactory.newDBError(error as Error);
    }
  }

  /**
   * Create teammate
   */
  async create(input: CreateTeammateInput): Promise<Teammate> {
    try {
      const teammate = new this.teammateModel({
        id: this.generateId(),
        ...input,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      
      const savedTeammate = await teammate.save();
      
      // Publish teammate created event
      await this.pubSubService.publish('TEAMMATE_CREATED', {
        teammateCreated: savedTeammate,
        requestId: input.requestId || 'unknown'
      });
      
      return savedTeammate;
    } catch (error) {
      throw ErrorFactory.newDBError(error as Error);
    }
  }

  /**
   * Update teammate
   */
  async update(input: UpdateTeammateInput): Promise<Teammate> {
    try {
      const { id, ...updateData } = input;
      
      const updatedTeammate = await this.teammateModel.findOneAndUpdate(
        { id },
        { ...updateData, updatedAt: new Date().toISOString() },
        { new: true }
      ).exec();

      if (!updatedTeammate) {
        throw ErrorFactory.newNotFoundError(new Error('Teammate not found'), { id });
      }

      // Publish teammate updated event
      await this.pubSubService.publish('TEAMMATE_UPDATED', {
        teammateUpdated: updatedTeammate,
        requestId: input.requestId || 'unknown'
      });

      return updatedTeammate;
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
