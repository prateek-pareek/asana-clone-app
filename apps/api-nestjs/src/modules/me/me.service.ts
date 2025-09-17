import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Me, MeDocument } from '../../database/schemas/me.schema';
import { UpdateMeInput } from '../../shared/dto/me.dto';

/**
 * Me service for user profile operations
 */
@Injectable()
export class MeService {
  constructor(
    @InjectModel(Me.name)
    private readonly meModel: Model<MeDocument>,
  ) {}

  /**
   * Get user profile by ID
   */
  async getById(id: string): Promise<Me> {
    const me = await this.meModel.findOne({ id }).exec();
    if (!me) {
      throw new Error('User not found');
    }
    return me;
  }

  /**
   * Update user profile
   */
  async update(input: UpdateMeInput): Promise<Me> {
    const { id, ...updateData } = input;
    
    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const updatedMe = await this.meModel.findOneAndUpdate(
      { id },
      { ...cleanUpdateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedMe) {
      throw new Error('User not found');
    }

    return updatedMe;
  }
}
