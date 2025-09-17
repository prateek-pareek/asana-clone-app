import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ArchivedTaskActivityService } from './archived-task-activity.service';
import { 
  ArchivedTaskActivity, 
  CreateArchivedTaskActivityInput, 
  UpdateArchivedTaskActivityInput,
  ArchivedTaskActivityConnection
} from '../../shared/dto/archived-task-activity.dto';

/**
 * ArchivedTaskActivity resolver for GraphQL operations
 */
@Resolver(() => ArchivedTaskActivity)
export class ArchivedTaskActivityResolver {
  constructor(private readonly archivedTaskActivityService: ArchivedTaskActivityService) {}

  /**
   * Get archived task activity by where clause
   */
  @Query(() => ArchivedTaskActivity, { nullable: true })
  async archivedTaskActivity(@Args('where') where: any): Promise<ArchivedTaskActivity | null> {
    return this.archivedTaskActivityService.get(where);
  }

  /**
   * Get archived task activities with pagination
   */
  @Query(() => ArchivedTaskActivityConnection)
  async archivedTaskActivities(
    @Args('after', { nullable: true }) after?: string,
    @Args('first', { nullable: true }) first?: number,
    @Args('before', { nullable: true }) before?: string,
    @Args('last', { nullable: true }) last?: number,
    @Args('where', { nullable: true }) where?: any
  ): Promise<ArchivedTaskActivityConnection> {
    return this.archivedTaskActivityService.getWithPagination(after, first, before, last, where);
  }

  /**
   * Create archived task activity
   */
  @Mutation(() => ArchivedTaskActivity)
  async createArchivedTaskActivity(@Args('input') input: CreateArchivedTaskActivityInput): Promise<ArchivedTaskActivity> {
    return this.archivedTaskActivityService.create(input);
  }

  /**
   * Update archived task activity
   */
  @Mutation(() => ArchivedTaskActivity)
  async updateArchivedTaskActivity(@Args('input') input: UpdateArchivedTaskActivityInput): Promise<ArchivedTaskActivity> {
    return this.archivedTaskActivityService.update(input);
  }
}
