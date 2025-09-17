import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArchivedTaskActivityTask, ArchivedTaskActivityTaskDocument } from '../../database/schemas/archived-task-activity-task.schema';
import { 
  CreateArchivedTaskActivityTaskInput, 
  UpdateArchivedTaskActivityTaskInput,
  ArchivedTaskActivityTaskConnection
} from '../../shared/dto/archived-task-activity-task.dto';

/**
 * ArchivedTaskActivityTask service for archived task activity task operations
 */
@Injectable()
export class ArchivedTaskActivityTaskService {
  constructor(
    @InjectModel(ArchivedTaskActivityTask.name)
    private readonly archivedTaskActivityTaskModel: Model<ArchivedTaskActivityTaskDocument>,
  ) {}

  /**
   * Create a new archived task activity task
   */
  async create(input: CreateArchivedTaskActivityTaskInput): Promise<ArchivedTaskActivityTask> {
    const archivedTaskActivityTask = new this.archivedTaskActivityTaskModel(input);
    const saved = await archivedTaskActivityTask.save();
    return saved;
  }

  /**
   * Update an archived task activity task
   */
  async update(input: UpdateArchivedTaskActivityTaskInput): Promise<ArchivedTaskActivityTask> {
    const { id, ...updateData } = input;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const updatedArchivedTaskActivityTask = await this.archivedTaskActivityTaskModel.findOneAndUpdate(
      { id },
      { ...cleanUpdateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedArchivedTaskActivityTask) {
      throw new Error('Archived task activity task not found');
    }

    return updatedArchivedTaskActivityTask;
  }

  /**
   * Get archived task activity task by ID
   */
  async getById(id: string): Promise<ArchivedTaskActivityTask> {
    const archivedTaskActivityTask = await this.archivedTaskActivityTaskModel.findOne({ id }).exec();
    if (!archivedTaskActivityTask) {
      throw new Error('Archived task activity task not found');
    }
    return archivedTaskActivityTask;
  }

  /**
   * Get archived task activity task by where clause
   */
  async get(where: any): Promise<ArchivedTaskActivityTask | null> {
    // TODO: Implement where clause filtering
    return this.archivedTaskActivityTaskModel.findOne(where || {}).exec();
  }

  /**
   * Get archived task activity tasks with pagination
   */
  async getWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: any
  ): Promise<ArchivedTaskActivityTaskConnection> {
    // TODO: Implement proper pagination logic
    const archivedTaskActivityTasks = await this.archivedTaskActivityTaskModel.find(where || {}).exec();
    
    return {
      totalCount: archivedTaskActivityTasks.length,
      edges: archivedTaskActivityTasks.map((archivedTaskActivityTask, index) => ({
        node: archivedTaskActivityTask,
        cursor: `cursor_${index}`,
      })),
    };
  }
}
