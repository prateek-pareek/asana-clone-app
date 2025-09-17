import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectTaskColumnDocument = ProjectTaskColumn & Document;

/**
 * ProjectTaskColumn schema for MongoDB
 * Represents project task columns
 */
@Schema({ timestamps: true })
export class ProjectTaskColumn {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  projectId: string;

  @Prop({ required: true })
  taskColumnId: string;

  @Prop({ required: true })
  width: string;

  @Prop({ required: true, default: false })
  disabled: boolean;

  @Prop({ required: true, default: true })
  customizable: boolean;

  @Prop({ required: true })
  order: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ProjectTaskColumnSchema = SchemaFactory.createForClass(ProjectTaskColumn);
