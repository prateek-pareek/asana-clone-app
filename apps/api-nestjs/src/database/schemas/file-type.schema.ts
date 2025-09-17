import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FileTypeDocument = FileType & Document;

/**
 * FileType schema matching Go model exactly
 */
@Schema({ collection: 'file_types' })
export class FileType {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  extension: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const FileTypeSchema = SchemaFactory.createForClass(FileType);
