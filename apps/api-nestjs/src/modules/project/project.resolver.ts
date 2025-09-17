import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { Project, CreateProjectInput, UpdateProjectInput, ProjectConnection } from '../../shared/dto/project.dto';
import { ProjectWhereInput } from '../../shared/dto/where-inputs/project-where-input.dto';
import { ID, Cursor } from '../../shared/types/common.types';
import { PubSubService } from '../../shared/services/pub-sub.service';
import { GraphQLErrorHandler } from '../../shared/errors/graphql-error-handler';

/**
 * Project resolver for GraphQL operations
 */
@Resolver(() => Project)
export class ProjectResolver {
  constructor(
    private readonly projectService: ProjectService,
    private readonly pubSubService: PubSubService,
    private readonly graphqlErrorHandler: GraphQLErrorHandler
  ) {}

  /**
   * Get project by where clause
   */
  @Query(() => Project, { nullable: true })
  async project(@Args('where') where: ProjectWhereInput): Promise<Project | null> {
    try {
      return await this.projectService.get(where);
    } catch (error) {
      const graphqlError = this.graphqlErrorHandler.handleGraphQLError(error as Error);
      if (graphqlError) {
        throw graphqlError;
      }
      throw error;
    }
  }

  /**
   * List projects with pagination
   */
  @Query(() => ProjectConnection)
  async projects(
    @Args('after', { type: () => String, nullable: true }) after?: string,
    @Args('first', { type: () => Number, nullable: true }) first?: number,
    @Args('before', { type: () => String, nullable: true }) before?: string,
    @Args('last', { type: () => Number, nullable: true }) last?: number,
    @Args('where', { type: () => ProjectWhereInput, nullable: true }) where?: ProjectWhereInput,
  ): Promise<ProjectConnection> {
    try {
      return await this.projectService.listWithPagination(after, first, before, last, where);
    } catch (error) {
      const graphqlError = this.graphqlErrorHandler.handleGraphQLError(error as Error);
      if (graphqlError) {
        throw graphqlError;
      }
      throw error;
    }
  }

  /**
   * Create project
   */
  @Mutation(() => Project)
  async createProject(@Args('input') input: CreateProjectInput): Promise<Project> {
    try {
      return await this.projectService.create(input);
    } catch (error) {
      const graphqlError = this.graphqlErrorHandler.handleGraphQLError(error as Error);
      if (graphqlError) {
        throw graphqlError;
      }
      throw error;
    }
  }

  /**
   * Update project
   */
  @Mutation(() => Project)
  async updateProject(@Args('input') input: UpdateProjectInput): Promise<Project> {
    try {
      return await this.projectService.update(input);
    } catch (error) {
      const graphqlError = this.graphqlErrorHandler.handleGraphQLError(error as Error);
      if (graphqlError) {
        throw graphqlError;
      }
      throw error;
    }
  }

  /**
   * Subscribe to project updates
   */
  @Subscription(() => Project)
  async projectUpdated(
    @Args('workspaceId', { type: () => String }) workspaceId: string,
    @Args('requestId') requestId: string
  ): Promise<any> {
    return this.pubSubService.asyncIteratorWithFilter(
      'PROJECT_UPDATED',
      (payload: { projectUpdated: Project; requestId?: string }) => {
        // Filter by workspaceId and exclude the request that triggered the update
        return payload.projectUpdated && 
               payload.requestId !== requestId;
      }
    );
  }

  /**
   * Subscribe to project creation
   */
  @Subscription(() => Project)
  async projectCreated(
    @Args('workspaceId', { type: () => String }) workspaceId: string,
    @Args('requestId') requestId: string
  ): Promise<any> {
    return this.pubSubService.asyncIteratorWithFilter(
      'PROJECT_CREATED',
      (payload: { projectCreated: Project; requestId?: string }) => {
        // Filter by workspaceId and exclude the request that triggered the creation
        return payload.projectCreated && 
               payload.requestId !== requestId;
      }
    );
  }
}
