import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeammateTaskTabStatus, TeammateTaskTabStatusDocument } from '../../database/schemas/teammate-task-tab-status.schema';
import { 
  CreateTeammateTaskTabStatusInput, 
  UpdateTeammateTaskTabStatusInput,
  TeammateTaskTabStatusConnection
} from '../../shared/dto/teammate-task-tab-status.dto';

/**
 * TeammateTaskTabStatus service for teammate task tab status operations
 */
@Injectable()
export class TeammateTaskTabStatusService {
  constructor(
    @InjectModel(TeammateTaskTabStatus.name)
    private readonly teammateTaskTabStatusModel: Model<TeammateTaskTabStatusDocument>,
  ) {}

  /**
   * Create a new teammate task tab status
   */
  async create(input: CreateTeammateTaskTabStatusInput): Promise<TeammateTaskTabStatus> {
    const teammateTaskTabStatus = new this.teammateTaskTabStatusModel(input);
    const saved = await teammateTaskTabStatus.save();
    return saved;
  }

  /**
   * Update a teammate task tab status
   */
  async update(input: UpdateTeammateTaskTabStatusInput): Promise<TeammateTaskTabStatus> {
    const { id, ...updateData } = input;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const updatedTeammateTaskTabStatus = await this.teammateTaskTabStatusModel.findOneAndUpdate(
      { id },
      { ...cleanUpdateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedTeammateTaskTabStatus) {
      throw new Error('Teammate task tab status not found');
    }

    return updatedTeammateTaskTabStatus;
  }

  /**
   * Get teammate task tab status by ID
   */
  async getById(id: string): Promise<TeammateTaskTabStatus> {
    const teammateTaskTabStatus = await this.teammateTaskTabStatusModel.findOne({ id }).exec();
    if (!teammateTaskTabStatus) {
      throw new Error('Teammate task tab status not found');
    }
    return teammateTaskTabStatus;
  }

  /**
   * Get teammate task tab status by where clause
   */
  async get(where: any): Promise<TeammateTaskTabStatus | null> {
    // TODO: Implement where clause filtering
    return this.teammateTaskTabStatusModel.findOne(where || {}).exec();
  }

  /**
   * Get teammate task tab statuses with pagination
   */
  async getWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: any
  ): Promise<TeammateTaskTabStatusConnection> {
    // TODO: Implement proper pagination logic
    const teammateTaskTabStatuses = await this.teammateTaskTabStatusModel.find(where || {}).exec();
    
    return {
      totalCount: teammateTaskTabStatuses.length,
      edges: teammateTaskTabStatuses.map((teammateTaskTabStatus, index) => ({
        node: teammateTaskTabStatus,
        cursor: `cursor_${index}`,
      })),
    };
  }
}
