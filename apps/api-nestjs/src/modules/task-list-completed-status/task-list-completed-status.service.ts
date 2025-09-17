import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskListCompletedStatus, TaskListCompletedStatusDocument } from '../../database/schemas/task-list-completed-status.schema';
import { 
  CreateTaskListCompletedStatusInput, 
  UpdateTaskListCompletedStatusInput,
  TaskListCompletedStatusConnection
} from '../../shared/dto/task-list-completed-status.dto';

/**
 * TaskListCompletedStatus service for task completion status operations
 */
@Injectable()
export class TaskListCompletedStatusService {
  constructor(
    @InjectModel(TaskListCompletedStatus.name)
    private readonly taskListCompletedStatusModel: Model<TaskListCompletedStatusDocument>,
  ) {}

  /**
   * Create a new task list completed status
   */
  async create(input: CreateTaskListCompletedStatusInput): Promise<TaskListCompletedStatus> {
    const taskListCompletedStatus = new this.taskListCompletedStatusModel(input);
    const saved = await taskListCompletedStatus.save();
    return saved;
  }

  /**
   * Update a task list completed status
   */
  async update(input: UpdateTaskListCompletedStatusInput): Promise<TaskListCompletedStatus> {
    const { id, ...updateData } = input;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const updatedStatus = await this.taskListCompletedStatusModel.findOneAndUpdate(
      { id },
      { ...cleanUpdateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedStatus) {
      throw new Error('Task list completed status not found');
    }

    return updatedStatus;
  }

  /**
   * Get task list completed status by ID
   */
  async getById(id: string): Promise<TaskListCompletedStatus> {
    const status = await this.taskListCompletedStatusModel.findOne({ id }).exec();
    if (!status) {
      throw new Error('Task list completed status not found');
    }
    return status;
  }

  /**
   * Get task list completed statuses with pagination
   */
  async getWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: any
  ): Promise<TaskListCompletedStatusConnection> {
    // TODO: Implement proper pagination logic
    const statuses = await this.taskListCompletedStatusModel.find(where || {}).exec();
    
    return {
      totalCount: statuses.length,
      edges: statuses.map((status, index) => ({
        node: status,
        cursor: `cursor_${index}`,
      })),
    };
  }
}
