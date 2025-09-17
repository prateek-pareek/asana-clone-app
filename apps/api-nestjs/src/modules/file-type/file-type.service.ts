import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileType, FileTypeDocument } from '../../database/schemas/file-type.schema';

/**
 * FileType service for file type operations
 */
@Injectable()
export class FileTypeService {
  constructor(
    @InjectModel(FileType.name)
    private readonly fileTypeModel: Model<FileTypeDocument>,
  ) {}

  /**
   * Get file type by ID
   */
  async getById(id: string): Promise<FileType> {
    const fileType = await this.fileTypeModel.findOne({ id }).exec();
    if (!fileType) {
      throw new Error('File type not found');
    }
    return fileType;
  }

  /**
   * List all file types
   */
  async list(): Promise<FileType[]> {
    return this.fileTypeModel.find().exec();
  }

  /**
   * Create file type
   */
  async create(input: any): Promise<FileType> {
    const fileType = new this.fileTypeModel({
      id: this.generateId(),
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    return fileType.save();
  }

  /**
   * Update file type
   */
  async update(input: any): Promise<FileType> {
    const { id, ...updateData } = input;
    
    const updatedFileType = await this.fileTypeModel.findOneAndUpdate(
      { id },
      { ...updateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedFileType) {
      throw new Error('File type not found');
    }

    return updatedFileType;
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
