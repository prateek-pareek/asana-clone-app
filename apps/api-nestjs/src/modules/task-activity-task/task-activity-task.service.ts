import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskActivityTask, TaskActivityTaskDocument } from '../../database/schemas/task-activity-task.schema';
import { 
  CreateTaskActivityTaskInput, 
  UpdateTaskActivityTaskInput,
  TaskActivityTaskConnection
} from '../../shared/dto/task-activity-task.dto';

/**
 * TaskActivityTask service for task activity task operations
 */
@Injectable()
export class TaskActivityTaskService {
  constructor(
    @InjectModel(TaskActivityTask.name)
    private readonly taskActivityTaskModel: Model<TaskActivityTaskDocument>,
  ) {}

  /**
   * Create a new task activity task
   */
  async create(input: CreateTaskActivityTaskInput): Promise<TaskActivityTask> {
    const taskActivityTask = new this.taskActivityTaskModel(input);
    const saved = await taskActivityTask.save();
    return saved;
  }

  /**
   * Update a task activity task
   */
  async update(input: UpdateTaskActivityTaskInput): Promise<TaskActivityTask> {
    const { id, ...updateData } = input;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const updatedTaskActivityTask = await this.taskActivityTaskModel.findOneAndUpdate(
      { id },
      { ...cleanUpdateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedTaskActivityTask) {
      throw new Error('Task activity task not found');
    }

    return updatedTaskActivityTask;
  }

  /**
   * Get task activity task by ID
   */
  async getById(id: string): Promise<TaskActivityTask> {
    const taskActivityTask = await this.taskActivityTaskModel.findOne({ id }).exec();
    if (!taskActivityTask) {
      throw new Error('Task activity task not found');
    }
    return taskActivityTask;
  }

  /**
   * Get task activity task by where clause
   */
  async get(where: any): Promise<TaskActivityTask | null> {
    // TODO: Implement where clause filtering
    return this.taskActivityTaskModel.findOne(where || {}).exec();
  }

  /**
   * Get task activity tasks with pagination
   */
  async getWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: any
  ): Promise<TaskActivityTaskConnection> {
    // TODO: Implement proper pagination logic
    const taskActivityTasks = await this.taskActivityTaskModel.find(where || {}).exec();
    
    return {
      totalCount: taskActivityTasks.length,
      edges: taskActivityTasks.map((taskActivityTask, index) => ({
        node: taskActivityTask,
        cursor: `cursor_${index}`,
      })),
    };
  }
}
