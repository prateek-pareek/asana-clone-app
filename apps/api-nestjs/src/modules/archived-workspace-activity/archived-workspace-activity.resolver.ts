import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ArchivedWorkspaceActivityService } from './archived-workspace-activity.service';
import { 
  ArchivedWorkspaceActivity, 
  CreateArchivedWorkspaceActivityInput, 
  UpdateArchivedWorkspaceActivityInput,
  ArchivedWorkspaceActivityConnection
} from '../../shared/dto/archived-workspace-activity.dto';

/**
 * ArchivedWorkspaceActivity resolver for GraphQL operations
 */
@Resolver(() => ArchivedWorkspaceActivity)
export class ArchivedWorkspaceActivityResolver {
  constructor(private readonly archivedWorkspaceActivityService: ArchivedWorkspaceActivityService) {}

  /**
   * Get archived workspace activity by where clause
   */
  @Query(() => ArchivedWorkspaceActivity, { nullable: true })
  async archivedWorkspaceActivity(@Args('where') where: any): Promise<ArchivedWorkspaceActivity | null> {
    return this.archivedWorkspaceActivityService.get(where);
  }

  /**
   * Get archived workspace activities with pagination
   */
  @Query(() => ArchivedWorkspaceActivityConnection)
  async archivedWorkspaceActivities(
    @Args('after', { nullable: true }) after?: string,
    @Args('first', { nullable: true }) first?: number,
    @Args('before', { nullable: true }) before?: string,
    @Args('last', { nullable: true }) last?: number,
    @Args('where', { nullable: true }) where?: any
  ): Promise<ArchivedWorkspaceActivityConnection> {
    return this.archivedWorkspaceActivityService.getWithPagination(after, first, before, last, where);
  }

  /**
   * Create archived workspace activity
   */
  @Mutation(() => ArchivedWorkspaceActivity)
  async createArchivedWorkspaceActivity(@Args('input') input: CreateArchivedWorkspaceActivityInput): Promise<ArchivedWorkspaceActivity> {
    return this.archivedWorkspaceActivityService.create(input);
  }

  /**
   * Update archived workspace activity
   */
  @Mutation(() => ArchivedWorkspaceActivity)
  async updateArchivedWorkspaceActivity(@Args('input') input: UpdateArchivedWorkspaceActivityInput): Promise<ArchivedWorkspaceActivity> {
    return this.archivedWorkspaceActivityService.update(input);
  }
}
