import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeammateTask, TeammateTaskDocument } from '../../database/schemas/teammate-task.schema';
import { 
  CreateTeammateTaskInput, 
  UpdateTeammateTaskInput, 
  DeleteTeammateTaskInput,
  TeammateTaskConnection
} from '../../shared/dto/teammate-task.dto';

/**
 * TeammateTask service for teammate task operations
 */
@Injectable()
export class TeammateTaskService {
  constructor(
    @InjectModel(TeammateTask.name)
    private readonly teammateTaskModel: Model<TeammateTaskDocument>,
  ) {}

  /**
   * Create a new teammate task
   */
  async create(input: CreateTeammateTaskInput): Promise<TeammateTask> {
    const teammateTask = new this.teammateTaskModel(input);
    const saved = await teammateTask.save();
    return saved;
  }

  /**
   * Update a teammate task
   */
  async update(input: UpdateTeammateTaskInput): Promise<TeammateTask> {
    const { id, ...updateData } = input;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const updatedTeammateTask = await this.teammateTaskModel.findOneAndUpdate(
      { id },
      { ...cleanUpdateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedTeammateTask) {
      throw new Error('Teammate task not found');
    }

    return updatedTeammateTask;
  }

  /**
   * Delete a teammate task
   */
  async delete(input: DeleteTeammateTaskInput): Promise<TeammateTask> {
    const teammateTask = await this.teammateTaskModel.findOne({ id: input.id }).exec();
    
    if (!teammateTask) {
      throw new Error('Teammate task not found');
    }

    await this.teammateTaskModel.deleteOne({ id: input.id }).exec();
    return teammateTask;
  }

  /**
   * Get teammate task by ID
   */
  async getById(id: string): Promise<TeammateTask> {
    const teammateTask = await this.teammateTaskModel.findOne({ id }).exec();
    if (!teammateTask) {
      throw new Error('Teammate task not found');
    }
    return teammateTask;
  }

  /**
   * Get teammate tasks with pagination
   */
  async getWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: any
  ): Promise<TeammateTaskConnection> {
    // TODO: Implement proper pagination logic
    const teammateTasks = await this.teammateTaskModel.find(where || {}).exec();
    
    return {
      totalCount: teammateTasks.length,
      edges: teammateTasks.map((teammateTask, index) => ({
        node: teammateTask,
        cursor: `cursor_${index}`,
      })),
    };
  }

  /**
   * Get tasks due soon for a teammate
   */
  async getTasksDueSoon(workspaceId: string, teammateId: string): Promise<TeammateTask[]> {
    // TODO: Implement due soon logic
    return this.teammateTaskModel.find({ workspaceId, teammateId }).exec();
  }
}
