import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskColumn, TaskColumnDocument } from '../../database/schemas/task-column.schema';
import { 
  CreateTaskColumnInput, 
  UpdateTaskColumnInput, 
  TaskColumnConnection
} from '../../shared/dto/task-column.dto';

/**
 * TaskColumn service for task column operations
 */
@Injectable()
export class TaskColumnService {
  constructor(
    @InjectModel(TaskColumn.name)
    private readonly taskColumnModel: Model<TaskColumnDocument>,
  ) {}

  /**
   * Create a new task column
   */
  async create(input: CreateTaskColumnInput): Promise<TaskColumn> {
    const taskColumn = new this.taskColumnModel(input);
    const saved = await taskColumn.save();
    return saved;
  }

  /**
   * Update a task column
   */
  async update(input: UpdateTaskColumnInput): Promise<TaskColumn> {
    const { id, ...updateData } = input;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const updatedTaskColumn = await this.taskColumnModel.findOneAndUpdate(
      { id },
      { ...cleanUpdateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedTaskColumn) {
      throw new Error('Task column not found');
    }

    return updatedTaskColumn;
  }

  /**
   * Get task column by ID
   */
  async getById(id: string): Promise<TaskColumn> {
    const taskColumn = await this.taskColumnModel.findOne({ id }).exec();
    if (!taskColumn) {
      throw new Error('Task column not found');
    }
    return taskColumn;
  }

  /**
   * Get task columns with pagination
   */
  async getWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: any
  ): Promise<TaskColumnConnection> {
    // TODO: Implement proper pagination logic
    const taskColumns = await this.taskColumnModel.find(where || {}).exec();
    
    return {
      totalCount: taskColumns.length,
      edges: taskColumns.map((taskColumn, index) => ({
        node: taskColumn,
        cursor: `cursor_${index}`,
      })),
    };
  }
}
