import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mention, MentionDocument } from '../../database/schemas/mention.schema';

/**
 * Mention service for mention operations
 */
@Injectable()
export class MentionService {
  constructor(
    @InjectModel(Mention.name)
    private readonly mentionModel: Model<MentionDocument>,
  ) {}

  /**
   * Get mention by ID
   */
  async getById(id: string): Promise<Mention> {
    const mention = await this.mentionModel.findOne({ id }).exec();
    if (!mention) {
      throw new Error('Mention not found');
    }
    return mention;
  }

  /**
   * List all mentions
   */
  async list(): Promise<Mention[]> {
    return this.mentionModel.find().exec();
  }

  /**
   * Create mention
   */
  async create(input: any): Promise<Mention> {
    const mention = new this.mentionModel({
      id: this.generateId(),
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    return mention.save();
  }

  /**
   * Update mention
   */
  async update(input: any): Promise<Mention> {
    const { id, ...updateData } = input;
    
    const updatedMention = await this.mentionModel.findOneAndUpdate(
      { id },
      { ...updateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedMention) {
      throw new Error('Mention not found');
    }

    return updatedMention;
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
