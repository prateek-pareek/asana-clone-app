import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeammateTaskListStatus, TeammateTaskListStatusDocument } from '../../database/schemas/teammate-task-list-status.schema';
import { 
  CreateTeammateTaskListStatusInput, 
  UpdateTeammateTaskListStatusInput,
  TeammateTaskListStatusConnection
} from '../../shared/dto/teammate-task-list-status.dto';

/**
 * TeammateTaskListStatus service for teammate task list status operations
 */
@Injectable()
export class TeammateTaskListStatusService {
  constructor(
    @InjectModel(TeammateTaskListStatus.name)
    private readonly teammateTaskListStatusModel: Model<TeammateTaskListStatusDocument>,
  ) {}

  /**
   * Create a new teammate task list status
   */
  async create(input: CreateTeammateTaskListStatusInput): Promise<TeammateTaskListStatus> {
    const teammateTaskListStatus = new this.teammateTaskListStatusModel(input);
    const saved = await teammateTaskListStatus.save();
    return saved;
  }

  /**
   * Update a teammate task list status
   */
  async update(input: UpdateTeammateTaskListStatusInput): Promise<TeammateTaskListStatus> {
    const { id, ...updateData } = input;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const updatedTeammateTaskListStatus = await this.teammateTaskListStatusModel.findOneAndUpdate(
      { id },
      { ...cleanUpdateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedTeammateTaskListStatus) {
      throw new Error('Teammate task list status not found');
    }

    return updatedTeammateTaskListStatus;
  }

  /**
   * Get teammate task list status by ID
   */
  async getById(id: string): Promise<TeammateTaskListStatus> {
    const teammateTaskListStatus = await this.teammateTaskListStatusModel.findOne({ id }).exec();
    if (!teammateTaskListStatus) {
      throw new Error('Teammate task list status not found');
    }
    return teammateTaskListStatus;
  }

  /**
   * Get teammate task list status by where clause
   */
  async get(where: any): Promise<TeammateTaskListStatus | null> {
    // TODO: Implement where clause filtering
    return this.teammateTaskListStatusModel.findOne(where || {}).exec();
  }

  /**
   * Get teammate task list statuses with pagination
   */
  async getWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: any
  ): Promise<TeammateTaskListStatusConnection> {
    // TODO: Implement proper pagination logic
    const teammateTaskListStatuses = await this.teammateTaskListStatusModel.find(where || {}).exec();
    
    return {
      totalCount: teammateTaskListStatuses.length,
      edges: teammateTaskListStatuses.map((teammateTaskListStatus, index) => ({
        node: teammateTaskListStatus,
        cursor: `cursor_${index}`,
      })),
    };
  }
}
