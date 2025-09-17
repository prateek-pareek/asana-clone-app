import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from '../../database/schemas/project.schema';
import { CreateProjectInput, UpdateProjectInput, ProjectConnection } from '../../shared/dto/project.dto';
import { ProjectWhereInput } from '../../shared/dto/where-inputs/project-where-input.dto';
import { WhereClauseService } from '../../shared/services/where-clause.service';
import { PaginationService, PaginationOptions } from '../../shared/services/pagination.service';
import { PubSubService } from '../../shared/services/pub-sub.service';
import { ErrorFactory, DatabaseError, NotFoundError } from '../../shared/errors/custom-errors';

/**
 * Project service for project operations
 */
@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
    private readonly whereClauseService: WhereClauseService,
    private readonly paginationService: PaginationService,
    private readonly pubSubService: PubSubService,
  ) {}

  /**
   * Get project by where input
   */
  async get(where: ProjectWhereInput): Promise<Project | null> {
    try {
      const filter = this.whereClauseService.buildProjectFilter(where);
      
      const project = await this.projectModel
        .findOne(filter)
        .populate('workspace')
        .populate('projectTasks.task')
        .populate('projectTeammates.teammate')
        .populate('projectTaskSections')
        .populate('projectTaskColumns')
        .populate('projectTaskListStatuses')
        .populate('projectBaseColors')
        .populate('projectIcons')
        .populate('projectLightColors')
        .populate('favoriteProjects')
        .exec();
      
      return project;
    } catch (error) {
      throw ErrorFactory.newDBError(error as Error);
    }
  }

  /**
   * List all projects
   */
  async list(): Promise<Project[]> {
    try {
      return await this.projectModel
        .find()
        .populate('workspace')
        .populate('projectTasks.task')
        .populate('projectTeammates.teammate')
        .populate('projectTaskSections')
        .populate('projectTaskColumns')
        .populate('projectTaskListStatuses')
        .populate('projectBaseColors')
        .populate('projectIcons')
        .populate('projectLightColors')
        .populate('favoriteProjects')
        .exec();
    } catch (error) {
      throw ErrorFactory.newDBError(error as Error);
    }
  }

  /**
   * List projects with pagination
   */
  async listWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: ProjectWhereInput
  ): Promise<ProjectConnection> {
    try {
      const filter = where ? this.whereClauseService.buildProjectFilter(where) : {};
      
      const paginationOptions: PaginationOptions = {
        after,
        first,
        before,
        last
      };

      const result = await this.paginationService.paginate(
        this.projectModel,
        filter,
        paginationOptions,
        'createdAt',
        'desc'
      );

      // Populate relationships for each project
      const populatedProjects = await Promise.all(
        result.edges.map(async (edge) => {
          const populatedProject = await this.projectModel
            .findById(edge.node._id)
            .populate('workspace')
            .populate('projectTasks.task')
            .populate('projectTeammates.teammate')
            .populate('projectTaskSections')
            .populate('projectTaskColumns')
            .populate('projectTaskListStatuses')
            .populate('projectBaseColors')
            .populate('projectIcons')
            .populate('projectLightColors')
            .populate('favoriteProjects')
            .exec();
          
          return {
            node: populatedProject || edge.node,
            cursor: edge.cursor
          };
        })
      );

      return {
        totalCount: result.totalCount,
        edges: populatedProjects,
        pageInfo: result.pageInfo
      };
    } catch (error) {
      throw ErrorFactory.newDBError(error as Error);
    }
  }

  /**
   * Create project
   */
  async create(input: CreateProjectInput): Promise<Project> {
    try {
      const project = new this.projectModel({
        id: this.generateId(),
        ...input,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      const savedProject = await project.save();
      
      // Publish project created event
      await this.pubSubService.publish('PROJECT_CREATED', {
        projectCreated: savedProject,
        requestId: input.requestId || 'unknown'
      });
      
      return savedProject;
    } catch (error) {
      throw ErrorFactory.newDBError(error as Error);
    }
  }

  /**
   * Update project
   */
  async update(input: UpdateProjectInput): Promise<Project> {
    try {
      const { id, ...updateData } = input;
      
      const updatedProject = await this.projectModel.findOneAndUpdate(
        { id },
        { ...updateData, updatedAt: new Date() },
        { new: true }
      ).exec();

      if (!updatedProject) {
        throw ErrorFactory.newNotFoundError(new Error('Project not found'), { id });
      }

      // Publish project updated event
      await this.pubSubService.publish('PROJECT_UPDATED', {
        projectUpdated: updatedProject,
        requestId: input.requestId || 'unknown'
      });

      return updatedProject;
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
