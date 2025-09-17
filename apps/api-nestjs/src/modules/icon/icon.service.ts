import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Icon, IconDocument } from '../../database/schemas/icon.schema';

/**
 * Icon service for icon operations
 */
@Injectable()
export class IconService {
  constructor(
    @InjectModel(Icon.name)
    private readonly iconModel: Model<IconDocument>,
  ) {}

  /**
   * Get icon by ID
   */
  async getById(id: string): Promise<Icon> {
    const icon = await this.iconModel.findOne({ id }).exec();
    if (!icon) {
      throw new Error('Icon not found');
    }
    return icon;
  }

  /**
   * List all icons
   */
  async list(): Promise<Icon[]> {
    return this.iconModel.find().exec();
  }

  /**
   * Create icon
   */
  async create(input: any): Promise<Icon> {
    const icon = new this.iconModel({
      id: this.generateId(),
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    return icon.save();
  }

  /**
   * Update icon
   */
  async update(input: any): Promise<Icon> {
    const { id, ...updateData } = input;
    
    const updatedIcon = await this.iconModel.findOneAndUpdate(
      { id },
      { ...updateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedIcon) {
      throw new Error('Icon not found');
    }

    return updatedIcon;
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
