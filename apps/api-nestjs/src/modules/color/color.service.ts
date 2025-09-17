import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Color, ColorDocument } from '../../database/schemas/color.schema';

/**
 * Color service for color operations
 */
@Injectable()
export class ColorService {
  constructor(
    @InjectModel(Color.name)
    private readonly colorModel: Model<ColorDocument>,
  ) {}

  /**
   * Get color by ID
   */
  async getById(id: string): Promise<Color> {
    const color = await this.colorModel.findOne({ id }).exec();
    if (!color) {
      throw new Error('Color not found');
    }
    return color;
  }

  /**
   * List all colors
   */
  async list(): Promise<Color[]> {
    return this.colorModel.find().exec();
  }

  /**
   * Create color
   */
  async create(input: any): Promise<Color> {
    const color = new this.colorModel({
      id: this.generateId(),
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    return color.save();
  }

  /**
   * Update color
   */
  async update(input: any): Promise<Color> {
    const { id, ...updateData } = input;
    
    const updatedColor = await this.colorModel.findOneAndUpdate(
      { id },
      { ...updateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedColor) {
      throw new Error('Color not found');
    }

    return updatedColor;
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
