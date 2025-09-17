import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TaskActivityService } from './task-activity.service';
import { 
  TaskActivity, 
  CreateTaskActivityInput, 
  UpdateTaskActivityInput,
  TaskActivityConnection
} from '../../shared/dto/task-activity.dto';

/**
 * TaskActivity resolver for GraphQL operations
 */
@Resolver(() => TaskActivity)
export class TaskActivityResolver {
  constructor(private readonly taskActivityService: TaskActivityService) {}

  /**
   * Get task activity by where clause
   */
  @Query(() => TaskActivity, { nullable: true })
  async taskActivity(@Args('where') where: any): Promise<TaskActivity | null> {
    // TODO: Implement where clause filtering
    return null;
  }

  /**
   * Get task activities with pagination
   */
  @Query(() => TaskActivityConnection)
  async taskActivities(
    @Args('after', { nullable: true }) after?: string,
    @Args('first', { nullable: true }) first?: number,
    @Args('before', { nullable: true }) before?: string,
    @Args('last', { nullable: true }) last?: number,
    @Args('where', { nullable: true }) where?: any
  ): Promise<TaskActivityConnection> {
    return this.taskActivityService.getWithPagination(after, first, before, last, where);
  }

  /**
   * Create task activity
   */
  @Mutation(() => TaskActivity)
  async createTaskActivity(@Args('input') input: CreateTaskActivityInput): Promise<TaskActivity> {
    return this.taskActivityService.create(input);
  }

  /**
   * Update task activity
   */
  @Mutation(() => TaskActivity)
  async updateTaskActivity(@Args('input') input: UpdateTaskActivityInput): Promise<TaskActivity> {
    return this.taskActivityService.update(input);
  }
}
