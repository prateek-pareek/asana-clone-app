import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { 
  Task, 
  CreateTaskInput, 
  UpdateTaskInput, 
  DeleteTaskInput, 
  DeleteTaskPayload,
  UndeleteTaskInput,
  UndeleteTaskPayload,
  DeleteAllTaskInput,
  DeleteAllTaskPayload,
  UndeleteAllTaskInput,
  UndeleteAllTaskPayload,
  AssignTaskInput,
  AssignTaskPayload,
  UnassignTaskInput,
  UnassignTaskPayload,
  TaskConnection
} from '../../shared/dto/task.dto';
import { TaskWhereInput } from '../../shared/dto/where-inputs/task-where-input.dto';
import { ID, Cursor } from '../../shared/types/common.types';
import { PubSubService } from '../../shared/services/pub-sub.service';
import { GraphQLErrorHandler } from '../../shared/errors/graphql-error-handler';

/**
 * Task resolver for GraphQL operations
 */
@Resolver(() => Task)
export class TaskResolver {
  constructor(
    private readonly taskService: TaskService,
    private readonly pubSubService: PubSubService,
    private readonly graphqlErrorHandler: GraphQLErrorHandler
  ) {}

  /**
   * Get task by where clause
   */
  @Query(() => Task, { nullable: true })
  async task(@Args('where') where: TaskWhereInput): Promise<Task | null> {
    try {
      return await this.taskService.get(where);
    } catch (error) {
      const graphqlError = this.graphqlErrorHandler.handleGraphQLError(error as Error);
      if (graphqlError) {
        throw graphqlError;
      }
      throw error;
    }
  }

  /**
   * List tasks with pagination
   */
  @Query(() => TaskConnection)
  async tasks(
    @Args('after', { type: () => Cursor, nullable: true }) after?: string,
    @Args('first', { type: () => Number, nullable: true }) first?: number,
    @Args('before', { type: () => Cursor, nullable: true }) before?: string,
    @Args('last', { type: () => Number, nullable: true }) last?: number,
    @Args('where', { nullable: true }) where?: TaskWhereInput,
  ): Promise<TaskConnection> {
    return this.taskService.listWithPagination(after, first, before, last, where);
  }

  /**
   * Create task
   */
  @Mutation(() => Task)
  async createTask(@Args('input') input: CreateTaskInput): Promise<Task> {
    return this.taskService.create(input);
  }

  /**
   * Update task
   */
  @Mutation(() => Task)
  async updateTask(@Args('input') input: UpdateTaskInput): Promise<Task> {
    return this.taskService.update(input);
  }

  /**
   * Delete task
   */
  @Mutation(() => DeleteTaskPayload)
  async deleteTask(@Args('input') input: DeleteTaskInput): Promise<DeleteTaskPayload> {
    return this.taskService.delete(input);
  }

  /**
   * Undelete task
   */
  @Mutation(() => UndeleteTaskPayload)
  async undeleteTask(@Args('input') input: UndeleteTaskInput): Promise<UndeleteTaskPayload> {
    return this.taskService.undelete(input);
  }

  /**
   * Delete all tasks
   */
  @Mutation(() => DeleteAllTaskPayload)
  async deleteAllTasks(@Args('input') input: DeleteAllTaskInput): Promise<DeleteAllTaskPayload> {
    return this.taskService.deleteAll(input);
  }

  /**
   * Undelete all tasks
   */
  @Mutation(() => UndeleteAllTaskPayload)
  async undeleteAllTasks(@Args('input') input: UndeleteAllTaskInput): Promise<UndeleteAllTaskPayload> {
    return this.taskService.undeleteAll(input);
  }

  /**
   * Assign task
   */
  @Mutation(() => AssignTaskPayload)
  async assignTask(@Args('input') input: AssignTaskInput): Promise<AssignTaskPayload> {
    return this.taskService.assign(input);
  }

  /**
   * Unassign task
   */
  @Mutation(() => UnassignTaskPayload)
  async unassignTask(@Args('input') input: UnassignTaskInput): Promise<UnassignTaskPayload> {
    return this.taskService.unassign(input);
  }

  /**
   * Subscribe to task updates
   */
  @Subscription(() => Task)
  async taskUpdated(
    @Args('workspaceId', { type: () => ID }) workspaceId: string,
    @Args('requestId') requestId: string
  ): Promise<AsyncIterator<Task>> {
    return this.pubSubService.asyncIteratorWithFilter(
      'TASK_UPDATED',
      (payload: { taskUpdated: Task }) => {
        // Filter by workspaceId and exclude the request that triggered the update
        return payload.taskUpdated && 
               payload.taskUpdated.workspaceId === workspaceId &&
               payload.requestId !== requestId;
      }
    );
  }

  /**
   * Subscribe to task deletion
   */
  @Subscription(() => DeleteTaskPayload)
  async taskDeleted(
    @Args('workspaceId', { type: () => ID }) workspaceId: string,
    @Args('requestId') requestId: string
  ): Promise<AsyncIterator<DeleteTaskPayload>> {
    return this.pubSubService.asyncIteratorWithFilter(
      'TASK_DELETED',
      (payload: { taskDeleted: DeleteTaskPayload }) => {
        // Filter by workspaceId and exclude the request that triggered the deletion
        return payload.taskDeleted && 
               payload.requestId !== requestId;
      }
    );
  }

  /**
   * Subscribe to task undeletion
   */
  @Subscription(() => UndeleteTaskPayload)
  async taskUndeleted(
    @Args('workspaceId', { type: () => ID }) workspaceId: string,
    @Args('requestId') requestId: string
  ): Promise<AsyncIterator<UndeleteTaskPayload>> {
    return this.pubSubService.asyncIteratorWithFilter(
      'TASK_UNDELETED',
      (payload: { taskUndeleted: UndeleteTaskPayload }) => {
        // Filter by workspaceId and exclude the request that triggered the undeletion
        return payload.taskUndeleted && 
               payload.requestId !== requestId;
      }
    );
  }

  /**
   * Subscribe to task assignment
   */
  @Subscription(() => AssignTaskPayload)
  async taskAssigned(
    @Args('workspaceId', { type: () => ID }) workspaceId: string,
    @Args('requestId') requestId: string
  ): Promise<AsyncIterator<AssignTaskPayload>> {
    return this.pubSubService.asyncIteratorWithFilter(
      'TASK_ASSIGNED',
      (payload: { taskAssigned: AssignTaskPayload }) => {
        // Filter by workspaceId and exclude the request that triggered the assignment
        return payload.taskAssigned && 
               payload.requestId !== requestId;
      }
    );
  }

  /**
   * Subscribe to task unassignment
   */
  @Subscription(() => UnassignTaskPayload)
  async taskUnassigned(
    @Args('workspaceId', { type: () => ID }) workspaceId: string,
    @Args('requestId') requestId: string
  ): Promise<AsyncIterator<UnassignTaskPayload>> {
    return this.pubSubService.asyncIteratorWithFilter(
      'TASK_UNASSIGNED',
      (payload: { taskUnassigned: UnassignTaskPayload }) => {
        // Filter by workspaceId and exclude the request that triggered the unassignment
        return payload.taskUnassigned && 
               payload.requestId !== requestId;
      }
    );
  }
}
