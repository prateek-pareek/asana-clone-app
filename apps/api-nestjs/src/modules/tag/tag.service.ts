import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag, TagDocument } from '../../database/schemas/tag.schema';

/**
 * Tag service for tag operations
 */
@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag.name)
    private readonly tagModel: Model<TagDocument>,
  ) {}

  /**
   * Get tag by ID
   */
  async getById(id: string): Promise<Tag> {
    const tag = await this.tagModel.findOne({ id }).exec();
    if (!tag) {
      throw new Error('Tag not found');
    }
    return tag;
  }

  /**
   * List all tags
   */
  async list(): Promise<Tag[]> {
    return this.tagModel.find().exec();
  }

  /**
   * Create tag
   */
  async create(input: any): Promise<Tag> {
    const tag = new this.tagModel({
      id: this.generateId(),
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    return tag.save();
  }

  /**
   * Update tag
   */
  async update(input: any): Promise<Tag> {
    const { id, ...updateData } = input;
    
    const updatedTag = await this.tagModel.findOneAndUpdate(
      { id },
      { ...updateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedTag) {
      throw new Error('Tag not found');
    }

    return updatedTag;
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
