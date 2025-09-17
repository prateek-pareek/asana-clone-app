import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TaskListSortStatusService } from './task-list-sort-status.service';
import { 
  TaskListSortStatus, 
  CreateTaskListSortStatusInput, 
  UpdateTaskListSortStatusInput,
  TaskListSortStatusConnection
} from '../../shared/dto/task-list-sort-status.dto';

/**
 * TaskListSortStatus resolver for GraphQL operations
 */
@Resolver(() => TaskListSortStatus)
export class TaskListSortStatusResolver {
  constructor(private readonly taskListSortStatusService: TaskListSortStatusService) {}

  /**
   * Get task list sort status by where clause
   */
  @Query(() => TaskListSortStatus, { nullable: true })
  async taskListSortStatus(@Args('where') where: any): Promise<TaskListSortStatus | null> {
    // TODO: Implement where clause filtering
    return null;
  }

  /**
   * Get task list sort statuses with pagination
   */
  @Query(() => TaskListSortStatusConnection)
  async taskListSortStatuses(
    @Args('after', { nullable: true }) after?: string,
    @Args('first', { nullable: true }) first?: number,
    @Args('before', { nullable: true }) before?: string,
    @Args('last', { nullable: true }) last?: number,
    @Args('where', { nullable: true }) where?: any
  ): Promise<TaskListSortStatusConnection> {
    return this.taskListSortStatusService.getWithPagination(after, first, before, last, where);
  }

  /**
   * Create task list sort status
   */
  @Mutation(() => TaskListSortStatus)
  async createTaskListSortStatus(@Args('input') input: CreateTaskListSortStatusInput): Promise<TaskListSortStatus> {
    return this.taskListSortStatusService.create(input);
  }

  /**
   * Update task list sort status
   */
  @Mutation(() => TaskListSortStatus)
  async updateTaskListSortStatus(@Args('input') input: UpdateTaskListSortStatusInput): Promise<TaskListSortStatus> {
    return this.taskListSortStatusService.update(input);
  }
}
