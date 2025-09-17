import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from '../../database/schemas/task.schema';
import { 
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
import { WhereClauseService } from '../../shared/services/where-clause.service';
import { PaginationService, PaginationOptions } from '../../shared/services/pagination.service';
import { PubSubService } from '../../shared/services/pub-sub.service';
import { ErrorFactory, DatabaseError, NotFoundError, ValidationError } from '../../shared/errors/custom-errors';

/**
 * Task service for task operations
 */
@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
    private readonly whereClauseService: WhereClauseService,
    private readonly paginationService: PaginationService,
    private readonly pubSubService: PubSubService,
  ) {}

  /**
   * Get task by where input
   */
  async get(where: TaskWhereInput): Promise<Task | null> {
    try {
      const filter = this.whereClauseService.buildTaskFilter(where);
      
      const task = await this.taskModel
        .findOne(filter)
        .populate('taskPriority')
        .populate('subTasks')
        .populate('parentTask')
        .populate('projectTasks.project')
        .populate('taskTags.tag')
        .populate('taskCollaborators.teammate')
        .populate('taskFeeds')
        .populate('taskFiles')
        .exec();
      
      return task;
    } catch (error) {
      throw ErrorFactory.newDBError(error as Error);
    }
  }

  /**
   * List all tasks
   */
  async list(): Promise<Task[]> {
    try {
      return await this.taskModel
        .find()
        .populate('taskPriority')
        .populate('subTasks')
        .populate('parentTask')
        .populate('projectTasks.project')
        .populate('taskTags.tag')
        .populate('taskCollaborators.teammate')
        .populate('taskFeeds')
        .populate('taskFiles')
        .exec();
    } catch (error) {
      throw ErrorFactory.newDBError(error as Error);
    }
  }

  /**
   * List tasks with pagination
   */
  async listWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: TaskWhereInput
  ): Promise<TaskConnection> {
    try {
      const filter = where ? this.whereClauseService.buildTaskFilter(where) : {};
      
      const paginationOptions: PaginationOptions = {
        after,
        first,
        before,
        last
      };

      const result = await this.paginationService.paginate(
        this.taskModel,
        filter,
        paginationOptions,
        'createdAt',
        'desc'
      );

      // Populate relationships for each task
      const populatedTasks = await Promise.all(
        result.edges.map(async (edge) => {
          const populatedTask = await this.taskModel
            .findById(edge.node._id)
            .populate('taskPriority')
            .populate('subTasks')
            .populate('parentTask')
            .populate('projectTasks.project')
            .populate('taskTags.tag')
            .populate('taskCollaborators.teammate')
            .populate('taskFeeds')
            .populate('taskFiles')
            .exec();
          
          return {
            node: populatedTask || edge.node,
            cursor: edge.cursor
          };
        })
      );

      return {
        totalCount: result.totalCount,
        edges: populatedTasks,
        pageInfo: result.pageInfo
      };
    } catch (error) {
      throw ErrorFactory.newDBError(error as Error);
    }
  }

  /**
   * Create task
   */
  async create(input: CreateTaskInput): Promise<Task> {
    try {
      const task = new this.taskModel({
        id: this.generateId(),
        ...input,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      const savedTask = await task.save();
      
      // Publish task created event
      await this.pubSubService.publish('TASK_CREATED', {
        taskCreated: savedTask
      });
      
      return savedTask;
    } catch (error) {
      throw ErrorFactory.newDBError(error as Error);
    }
  }

  /**
   * Update task
   */
  async update(input: UpdateTaskInput): Promise<Task> {
    try {
      const { id, ...updateData } = input;
      
      const updatedTask = await this.taskModel.findOneAndUpdate(
        { id },
        { ...updateData, updatedAt: new Date() },
        { new: true }
      ).exec();

      if (!updatedTask) {
        throw ErrorFactory.newNotFoundError(new Error('Task not found'), { id });
      }

      // Publish task updated event
      await this.pubSubService.publish('TASK_UPDATED', {
        taskUpdated: updatedTask
      });

      return updatedTask;
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        throw error; // Re-throw NotFoundError
      }
      throw ErrorFactory.newDBError(error as Error);
    }
  }

  /**
   * Delete task
   */
  async delete(input: DeleteTaskInput): Promise<DeleteTaskPayload> {
    // This is a simplified implementation
    // In a real app, you'd implement proper soft delete logic
    const task = await this.get({ id: input.taskId });
    
    return {
      teammateTask: {} as any,
      projectTasks: [],
      deletedTask: {} as any,
    };
  }

  /**
   * Undelete task
   */
  async undelete(input: UndeleteTaskInput): Promise<UndeleteTaskPayload> {
    // This is a simplified implementation
    // In a real app, you'd implement proper undelete logic
    return {
      teammateTask: {} as any,
      projectTasks: [],
      deletedTask: {} as any,
    };
  }

  /**
   * Delete all tasks
   */
  async deleteAll(input: DeleteAllTaskInput): Promise<DeleteAllTaskPayload> {
    // This is a simplified implementation
    return {
      teammateTasks: [],
      projectTasks: [],
      deletedTasks: [],
    };
  }

  /**
   * Undelete all tasks
   */
  async undeleteAll(input: UndeleteAllTaskInput): Promise<UndeleteAllTaskPayload> {
    // This is a simplified implementation
    return {
      teammateTasks: [],
      projectTasks: [],
      deletedTasks: [],
    };
  }

  /**
   * Assign task
   */
  async assign(input: AssignTaskInput): Promise<AssignTaskPayload> {
    // This is a simplified implementation
    const task = await this.get({ id: input.id });
    
    return {
      task,
      teammateTask: {} as any,
    };
  }

  /**
   * Unassign task
   */
  async unassign(input: UnassignTaskInput): Promise<UnassignTaskPayload> {
    // This is a simplified implementation
    const task = await this.get({ id: input.id });
    
    return {
      task,
      teammateTaskId: '',
    };
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
