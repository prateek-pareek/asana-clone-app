import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { WorkspaceActivityTaskService } from './workspace-activity-task.service';
import { 
  WorkspaceActivityTask, 
  CreateWorkspaceActivityTaskInput, 
  UpdateWorkspaceActivityTaskInput,
  WorkspaceActivityTaskConnection
} from '../../shared/dto/workspace-activity-task.dto';

/**
 * WorkspaceActivityTask resolver for GraphQL operations
 */
@Resolver(() => WorkspaceActivityTask)
export class WorkspaceActivityTaskResolver {
  constructor(private readonly workspaceActivityTaskService: WorkspaceActivityTaskService) {}

  /**
   * Get workspace activity task by where clause
   */
  @Query(() => WorkspaceActivityTask, { nullable: true })
  async workspaceActivityTask(@Args('where') where: any): Promise<WorkspaceActivityTask | null> {
    return this.workspaceActivityTaskService.get(where);
  }

  /**
   * Get workspace activity tasks with pagination
   */
  @Query(() => WorkspaceActivityTaskConnection)
  async workspaceActivityTasks(
    @Args('after', { nullable: true }) after?: string,
    @Args('first', { nullable: true }) first?: number,
    @Args('before', { nullable: true }) before?: string,
    @Args('last', { nullable: true }) last?: number,
    @Args('where', { nullable: true }) where?: any
  ): Promise<WorkspaceActivityTaskConnection> {
    return this.workspaceActivityTaskService.getWithPagination(after, first, before, last, where);
  }

  /**
   * Create workspace activity task
   */
  @Mutation(() => WorkspaceActivityTask)
  async createWorkspaceActivityTask(@Args('input') input: CreateWorkspaceActivityTaskInput): Promise<WorkspaceActivityTask> {
    return this.workspaceActivityTaskService.create(input);
  }

  /**
   * Update workspace activity task
   */
  @Mutation(() => WorkspaceActivityTask)
  async updateWorkspaceActivityTask(@Args('input') input: UpdateWorkspaceActivityTaskInput): Promise<WorkspaceActivityTask> {
    return this.workspaceActivityTaskService.update(input);
  }
}
