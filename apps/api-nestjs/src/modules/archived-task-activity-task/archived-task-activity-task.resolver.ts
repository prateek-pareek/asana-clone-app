import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ArchivedTaskActivityTaskService } from './archived-task-activity-task.service';
import { 
  ArchivedTaskActivityTask, 
  CreateArchivedTaskActivityTaskInput, 
  UpdateArchivedTaskActivityTaskInput,
  ArchivedTaskActivityTaskConnection
} from '../../shared/dto/archived-task-activity-task.dto';

/**
 * ArchivedTaskActivityTask resolver for GraphQL operations
 */
@Resolver(() => ArchivedTaskActivityTask)
export class ArchivedTaskActivityTaskResolver {
  constructor(private readonly archivedTaskActivityTaskService: ArchivedTaskActivityTaskService) {}

  /**
   * Get archived task activity task by where clause
   */
  @Query(() => ArchivedTaskActivityTask, { nullable: true })
  async archivedTaskActivityTask(@Args('where') where: any): Promise<ArchivedTaskActivityTask | null> {
    return this.archivedTaskActivityTaskService.get(where);
  }

  /**
   * Get archived task activity tasks with pagination
   */
  @Query(() => ArchivedTaskActivityTaskConnection)
  async archivedTaskActivityTasks(
    @Args('after', { nullable: true }) after?: string,
    @Args('first', { nullable: true }) first?: number,
    @Args('before', { nullable: true }) before?: string,
    @Args('last', { nullable: true }) last?: number,
    @Args('where', { nullable: true }) where?: any
  ): Promise<ArchivedTaskActivityTaskConnection> {
    return this.archivedTaskActivityTaskService.getWithPagination(after, first, before, last, where);
  }

  /**
   * Create archived task activity task
   */
  @Mutation(() => ArchivedTaskActivityTask)
  async createArchivedTaskActivityTask(@Args('input') input: CreateArchivedTaskActivityTaskInput): Promise<ArchivedTaskActivityTask> {
    return this.archivedTaskActivityTaskService.create(input);
  }

  /**
   * Update archived task activity task
   */
  @Mutation(() => ArchivedTaskActivityTask)
  async updateArchivedTaskActivityTask(@Args('input') input: UpdateArchivedTaskActivityTaskInput): Promise<ArchivedTaskActivityTask> {
    return this.archivedTaskActivityTaskService.update(input);
  }
}
