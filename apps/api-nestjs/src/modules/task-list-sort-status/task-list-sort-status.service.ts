import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskListSortStatus, TaskListSortStatusDocument } from '../../database/schemas/task-list-sort-status.schema';
import { 
  CreateTaskListSortStatusInput, 
  UpdateTaskListSortStatusInput,
  TaskListSortStatusConnection
} from '../../shared/dto/task-list-sort-status.dto';

/**
 * TaskListSortStatus service for task sorting status operations
 */
@Injectable()
export class TaskListSortStatusService {
  constructor(
    @InjectModel(TaskListSortStatus.name)
    private readonly taskListSortStatusModel: Model<TaskListSortStatusDocument>,
  ) {}

  /**
   * Create a new task list sort status
   */
  async create(input: CreateTaskListSortStatusInput): Promise<TaskListSortStatus> {
    const taskListSortStatus = new this.taskListSortStatusModel(input);
    const saved = await taskListSortStatus.save();
    return saved;
  }

  /**
   * Update a task list sort status
   */
  async update(input: UpdateTaskListSortStatusInput): Promise<TaskListSortStatus> {
    const { id, ...updateData } = input;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const updatedStatus = await this.taskListSortStatusModel.findOneAndUpdate(
      { id },
      { ...cleanUpdateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedStatus) {
      throw new Error('Task list sort status not found');
    }

    return updatedStatus;
  }

  /**
   * Get task list sort status by ID
   */
  async getById(id: string): Promise<TaskListSortStatus> {
    const status = await this.taskListSortStatusModel.findOne({ id }).exec();
    if (!status) {
      throw new Error('Task list sort status not found');
    }
    return status;
  }

  /**
   * Get task list sort statuses with pagination
   */
  async getWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: any
  ): Promise<TaskListSortStatusConnection> {
    // TODO: Implement proper pagination logic
    const statuses = await this.taskListSortStatusModel.find(where || {}).exec();
    
    return {
      totalCount: statuses.length,
      edges: statuses.map((status, index) => ({
        node: status,
        cursor: `cursor_${index}`,
      })),
    };
  }
}
