import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeammateTaskColumn, TeammateTaskColumnDocument } from '../../database/schemas/teammate-task-column.schema';
import { 
  CreateTeammateTaskColumnInput, 
  UpdateTeammateTaskColumnInput,
  UpdateTeammateTaskColumnOrderInput,
  TeammateTaskColumnConnection
} from '../../shared/dto/teammate-task-column.dto';

/**
 * TeammateTaskColumn service for teammate task column operations
 */
@Injectable()
export class TeammateTaskColumnService {
  constructor(
    @InjectModel(TeammateTaskColumn.name)
    private readonly teammateTaskColumnModel: Model<TeammateTaskColumnDocument>,
  ) {}

  /**
   * Create a new teammate task column
   */
  async create(input: CreateTeammateTaskColumnInput): Promise<TeammateTaskColumn> {
    const teammateTaskColumn = new this.teammateTaskColumnModel(input);
    const saved = await teammateTaskColumn.save();
    return saved;
  }

  /**
   * Update a teammate task column
   */
  async update(input: UpdateTeammateTaskColumnInput): Promise<TeammateTaskColumn> {
    const { id, ...updateData } = input;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const updatedTeammateTaskColumn = await this.teammateTaskColumnModel.findOneAndUpdate(
      { id },
      { ...cleanUpdateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedTeammateTaskColumn) {
      throw new Error('Teammate task column not found');
    }

    return updatedTeammateTaskColumn;
  }

  /**
   * Update teammate task column order
   */
  async updateOrder(input: UpdateTeammateTaskColumnOrderInput): Promise<TeammateTaskColumn[]> {
    const { ids } = input;
    
    // Update order for each ID based on its position in the array
    const updatePromises = ids.map((id, index) => 
      this.teammateTaskColumnModel.findOneAndUpdate(
        { id },
        { order: index, updatedAt: new Date() },
        { new: true }
      ).exec()
    );

    const updatedTeammateTaskColumns = await Promise.all(updatePromises);
    return updatedTeammateTaskColumns.filter(column => column !== null) as TeammateTaskColumn[];
  }

  /**
   * Get teammate task column by ID
   */
  async getById(id: string): Promise<TeammateTaskColumn> {
    const teammateTaskColumn = await this.teammateTaskColumnModel.findOne({ id }).exec();
    if (!teammateTaskColumn) {
      throw new Error('Teammate task column not found');
    }
    return teammateTaskColumn;
  }

  /**
   * Get teammate task column by where clause
   */
  async get(where: any): Promise<TeammateTaskColumn | null> {
    // TODO: Implement where clause filtering
    return this.teammateTaskColumnModel.findOne(where || {}).exec();
  }

  /**
   * Get teammate task columns with pagination
   */
  async getWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: any
  ): Promise<TeammateTaskColumnConnection> {
    // TODO: Implement proper pagination logic
    const teammateTaskColumns = await this.teammateTaskColumnModel.find(where || {}).exec();
    
    return {
      totalCount: teammateTaskColumns.length,
      edges: teammateTaskColumns.map((teammateTaskColumn, index) => ({
        node: teammateTaskColumn,
        cursor: `cursor_${index}`,
      })),
    };
  }
}
