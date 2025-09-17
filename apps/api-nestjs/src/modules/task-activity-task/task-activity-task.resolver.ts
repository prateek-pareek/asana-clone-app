import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TaskActivityTaskService } from './task-activity-task.service';
import { 
  TaskActivityTask, 
  CreateTaskActivityTaskInput, 
  UpdateTaskActivityTaskInput,
  TaskActivityTaskConnection
} from '../../shared/dto/task-activity-task.dto';

/**
 * TaskActivityTask resolver for GraphQL operations
 */
@Resolver(() => TaskActivityTask)
export class TaskActivityTaskResolver {
  constructor(private readonly taskActivityTaskService: TaskActivityTaskService) {}

  /**
   * Get task activity task by where clause
   */
  @Query(() => TaskActivityTask, { nullable: true })
  async taskActivityTask(@Args('where') where: any): Promise<TaskActivityTask | null> {
    return this.taskActivityTaskService.get(where);
  }

  /**
   * Get task activity tasks with pagination
   */
  @Query(() => TaskActivityTaskConnection)
  async taskActivityTasks(
    @Args('after', { nullable: true }) after?: string,
    @Args('first', { nullable: true }) first?: number,
    @Args('before', { nullable: true }) before?: string,
    @Args('last', { nullable: true }) last?: number,
    @Args('where', { nullable: true }) where?: any
  ): Promise<TaskActivityTaskConnection> {
    return this.taskActivityTaskService.getWithPagination(after, first, before, last, where);
  }

  /**
   * Create task activity task
   */
  @Mutation(() => TaskActivityTask)
  async createTaskActivityTask(@Args('input') input: CreateTaskActivityTaskInput): Promise<TaskActivityTask> {
    return this.taskActivityTaskService.create(input);
  }

  /**
   * Update task activity task
   */
  @Mutation(() => TaskActivityTask)
  async updateTaskActivityTask(@Args('input') input: UpdateTaskActivityTaskInput): Promise<TaskActivityTask> {
    return this.taskActivityTaskService.update(input);
  }
}
