import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeletedTask, DeletedTaskDocument } from '../../database/schemas/deleted-task.schema';
import { 
  CreateDeletedTaskInput, 
  UpdateDeletedTaskInput,
  UndeleteDeletedTaskInput,
  DeletedTaskConnection
} from '../../shared/dto/deleted-task.dto';

/**
 * DeletedTask service for deleted task operations
 */
@Injectable()
export class DeletedTaskService {
  constructor(
    @InjectModel(DeletedTask.name)
    private readonly deletedTaskModel: Model<DeletedTaskDocument>,
  ) {}

  /**
   * Create a new deleted task record
   */
  async create(input: CreateDeletedTaskInput): Promise<DeletedTask> {
    const deletedTask = new this.deletedTaskModel(input);
    const saved = await deletedTask.save();
    return saved;
  }

  /**
   * Update a deleted task record
   */
  async update(input: UpdateDeletedTaskInput): Promise<DeletedTask> {
    const { id, ...updateData } = input;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const updatedDeletedTask = await this.deletedTaskModel.findOneAndUpdate(
      { id },
      { ...cleanUpdateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedDeletedTask) {
      throw new Error('Deleted task not found');
    }

    return updatedDeletedTask;
  }

  /**
   * Undelete a deleted task (remove from deleted tasks)
   */
  async undelete(input: UndeleteDeletedTaskInput): Promise<DeletedTask[]> {
    const deletedTasks = await this.deletedTaskModel.find({ taskId: input.taskId }).exec();
    
    if (deletedTasks.length === 0) {
      throw new Error('No deleted tasks found for the given task ID');
    }

    // Remove all deleted task records for this task
    await this.deletedTaskModel.deleteMany({ taskId: input.taskId }).exec();

    return deletedTasks;
  }

  /**
   * Get deleted task by ID
   */
  async getById(id: string): Promise<DeletedTask> {
    const deletedTask = await this.deletedTaskModel.findOne({ id }).exec();
    if (!deletedTask) {
      throw new Error('Deleted task not found');
    }
    return deletedTask;
  }

  /**
   * Get deleted tasks with pagination
   */
  async getWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: any
  ): Promise<DeletedTaskConnection> {
    // TODO: Implement proper pagination logic
    const deletedTasks = await this.deletedTaskModel.find(where || {}).exec();
    
    return {
      totalCount: deletedTasks.length,
      edges: deletedTasks.map((deletedTask, index) => ({
        node: deletedTask,
        cursor: `cursor_${index}`,
      })),
    };
  }
}
