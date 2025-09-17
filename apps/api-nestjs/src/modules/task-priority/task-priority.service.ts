import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskPriority, TaskPriorityDocument } from '../../database/schemas/task-priority.schema';
import { 
  CreateTaskPriorityInput, 
  UpdateTaskPriorityInput, 
  TaskPriorityConnection
} from '../../shared/dto/task-priority.dto';

/**
 * TaskPriority service for task priority operations
 */
@Injectable()
export class TaskPriorityService {
  constructor(
    @InjectModel(TaskPriority.name)
    private readonly taskPriorityModel: Model<TaskPriorityDocument>,
  ) {}

  /**
   * Create a new task priority
   */
  async create(input: CreateTaskPriorityInput): Promise<TaskPriority> {
    const taskPriority = new this.taskPriorityModel(input);
    const saved = await taskPriority.save();
    return saved;
  }

  /**
   * Update a task priority
   */
  async update(input: UpdateTaskPriorityInput): Promise<TaskPriority> {
    const { id, ...updateData } = input;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const updatedTaskPriority = await this.taskPriorityModel.findOneAndUpdate(
      { id },
      { ...cleanUpdateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedTaskPriority) {
      throw new Error('Task priority not found');
    }

    return updatedTaskPriority;
  }

  /**
   * Get task priority by ID
   */
  async getById(id: string): Promise<TaskPriority> {
    const taskPriority = await this.taskPriorityModel.findOne({ id }).exec();
    if (!taskPriority) {
      throw new Error('Task priority not found');
    }
    return taskPriority;
  }

  /**
   * Get task priorities with pagination
   */
  async getWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: any
  ): Promise<TaskPriorityConnection> {
    // TODO: Implement proper pagination logic
    const taskPriorities = await this.taskPriorityModel.find(where || {}).exec();
    
    return {
      totalCount: taskPriorities.length,
      edges: taskPriorities.map((taskPriority, index) => ({
        node: taskPriority,
        cursor: `cursor_${index}`,
      })),
    };
  }
}
