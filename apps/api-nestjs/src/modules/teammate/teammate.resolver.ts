import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { TeammateService } from './teammate.service';
import { 
  Teammate, 
  CreateTeammateInput, 
  UpdateTeammateInput, 
  TeammateConnection
} from '../../shared/dto/teammate.dto';
import { TeammateWhereInput } from '../../shared/dto/where-inputs/teammate-where-input.dto';
import { ID, Cursor } from '../../shared/types/common.types';
import { PubSubService } from '../../shared/services/pub-sub.service';
import { GraphQLErrorHandler } from '../../shared/errors/graphql-error-handler';

/**
 * Teammate resolver for GraphQL operations
 */
@Resolver(() => Teammate)
export class TeammateResolver {
  constructor(
    private readonly teammateService: TeammateService,
    private readonly pubSubService: PubSubService,
    private readonly graphqlErrorHandler: GraphQLErrorHandler
  ) {}

  /**
   * Get teammate by where clause
   */
  @Query(() => Teammate, { nullable: true })
  async teammate(@Args('where') where: TeammateWhereInput): Promise<Teammate | null> {
    try {
      return await this.teammateService.get(where);
    } catch (error) {
      const graphqlError = this.graphqlErrorHandler.handleGraphQLError(error as Error);
      if (graphqlError) {
        throw graphqlError;
      }
      throw error;
    }
  }

  /**
   * Get teammates with pagination
   */
  @Query(() => TeammateConnection)
  async teammates(
    @Args('after', { type: () => String, nullable: true }) after?: string,
    @Args('first', { type: () => Number, nullable: true }) first?: number,
    @Args('before', { type: () => String, nullable: true }) before?: string,
    @Args('last', { type: () => Number, nullable: true }) last?: number,
    @Args('where', { type: () => TeammateWhereInput, nullable: true }) where?: TeammateWhereInput
  ): Promise<TeammateConnection> {
    try {
      return await this.teammateService.listWithPagination(after, first, before, last, where);
    } catch (error) {
      const graphqlError = this.graphqlErrorHandler.handleGraphQLError(error as Error);
      if (graphqlError) {
        throw graphqlError;
      }
      throw error;
    }
  }

  /**
   * Create teammate
   */
  @Mutation(() => Teammate)
  async createTeammate(@Args('input') input: CreateTeammateInput): Promise<Teammate> {
    try {
      return await this.teammateService.create(input);
    } catch (error) {
      const graphqlError = this.graphqlErrorHandler.handleGraphQLError(error as Error);
      if (graphqlError) {
        throw graphqlError;
      }
      throw error;
    }
  }

  /**
   * Update teammate
   */
  @Mutation(() => Teammate)
  async updateTeammate(@Args('input') input: UpdateTeammateInput): Promise<Teammate> {
    try {
      return await this.teammateService.update(input);
    } catch (error) {
      const graphqlError = this.graphqlErrorHandler.handleGraphQLError(error as Error);
      if (graphqlError) {
        throw graphqlError;
      }
      throw error;
    }
  }

  /**
   * Subscribe to teammate updates
   */
  @Subscription(() => Teammate)
  async teammateUpdated(
    @Args('requestId') requestId: string
  ): Promise<any> {
    return this.pubSubService.asyncIteratorWithFilter(
      'TEAMMATE_UPDATED',
      (payload: { teammateUpdated: Teammate; requestId?: string }) => {
        // Filter by requestId to exclude the request that triggered the update
        return payload.teammateUpdated && 
               payload.requestId !== requestId;
      }
    );
  }

  /**
   * Subscribe to teammate creation
   */
  @Subscription(() => Teammate)
  async teammateCreated(
    @Args('requestId') requestId: string
  ): Promise<any> {
    return this.pubSubService.asyncIteratorWithFilter(
      'TEAMMATE_CREATED',
      (payload: { teammateCreated: Teammate; requestId?: string }) => {
        // Filter by requestId to exclude the request that triggered the creation
        return payload.teammateCreated && 
               payload.requestId !== requestId;
      }
    );
  }
}
