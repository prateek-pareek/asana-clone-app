import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskFile, TaskFileDocument } from '../../database/schemas/task-file.schema';
import { 
  CreateTaskFileInput, 
  UpdateTaskFileInput, 
  TaskFileConnection
} from '../../shared/dto/task-file.dto';

/**
 * TaskFile service for task file operations
 */
@Injectable()
export class TaskFileService {
  constructor(
    @InjectModel(TaskFile.name)
    private readonly taskFileModel: Model<TaskFileDocument>,
  ) {}

  /**
   * Create a new task file
   */
  async create(input: CreateTaskFileInput): Promise<TaskFile> {
    const taskFile = new this.taskFileModel(input);
    const saved = await taskFile.save();
    return saved;
  }

  /**
   * Update a task file
   */
  async update(input: UpdateTaskFileInput): Promise<TaskFile> {
    const { id, ...updateData } = input;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const updatedTaskFile = await this.taskFileModel.findOneAndUpdate(
      { id },
      { ...cleanUpdateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedTaskFile) {
      throw new Error('Task file not found');
    }

    return updatedTaskFile;
  }

  /**
   * Get task file by ID
   */
  async getById(id: string): Promise<TaskFile> {
    const taskFile = await this.taskFileModel.findOne({ id }).exec();
    if (!taskFile) {
      throw new Error('Task file not found');
    }
    return taskFile;
  }

  /**
   * Get task files with pagination
   */
  async getWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: any
  ): Promise<TaskFileConnection> {
    // TODO: Implement proper pagination logic
    const taskFiles = await this.taskFileModel.find(where || {}).exec();
    
    return {
      totalCount: taskFiles.length,
      edges: taskFiles.map((taskFile, index) => ({
        node: taskFile,
        cursor: `cursor_${index}`,
      })),
    };
  }
}
