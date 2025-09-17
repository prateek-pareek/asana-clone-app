import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskSection, TaskSectionDocument } from '../../database/schemas/task-section.schema';
import { 
  CreateTaskSectionInput, 
  UpdateTaskSectionInput, 
  TaskSectionConnection
} from '../../shared/dto/task-section.dto';

/**
 * TaskSection service for task section operations
 */
@Injectable()
export class TaskSectionService {
  constructor(
    @InjectModel(TaskSection.name)
    private readonly taskSectionModel: Model<TaskSectionDocument>,
  ) {}

  /**
   * Create a new task section
   */
  async create(input: CreateTaskSectionInput): Promise<TaskSection> {
    const taskSection = new this.taskSectionModel(input);
    const saved = await taskSection.save();
    return saved;
  }

  /**
   * Update a task section
   */
  async update(input: UpdateTaskSectionInput): Promise<TaskSection> {
    const { id, ...updateData } = input;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const updatedTaskSection = await this.taskSectionModel.findOneAndUpdate(
      { id },
      { ...cleanUpdateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedTaskSection) {
      throw new Error('Task section not found');
    }

    return updatedTaskSection;
  }

  /**
   * Get task section by ID
   */
  async getById(id: string): Promise<TaskSection> {
    const taskSection = await this.taskSectionModel.findOne({ id }).exec();
    if (!taskSection) {
      throw new Error('Task section not found');
    }
    return taskSection;
  }

  /**
   * Get task sections with pagination
   */
  async getWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: any
  ): Promise<TaskSectionConnection> {
    // TODO: Implement proper pagination logic
    const taskSections = await this.taskSectionModel.find(where || {}).exec();
    
    return {
      totalCount: taskSections.length,
      edges: taskSections.map((taskSection, index) => ({
        node: taskSection,
        cursor: `cursor_${index}`,
      })),
    };
  }
}
