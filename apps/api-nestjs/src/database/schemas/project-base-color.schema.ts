import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectBaseColorDocument = ProjectBaseColor & Document;

/**
 * ProjectBaseColor schema for MongoDB
 * Represents project base colors
 */
@Schema({ timestamps: true })
export class ProjectBaseColor {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  colorId: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ProjectBaseColorSchema = SchemaFactory.createForClass(ProjectBaseColor);
