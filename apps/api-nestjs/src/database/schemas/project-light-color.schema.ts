import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectLightColorDocument = ProjectLightColor & Document;

/**
 * ProjectLightColor schema for MongoDB
 * Represents project light colors
 */
@Schema({ timestamps: true })
export class ProjectLightColor {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  colorId: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ProjectLightColorSchema = SchemaFactory.createForClass(ProjectLightColor);
