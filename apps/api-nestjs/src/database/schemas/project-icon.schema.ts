import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectIconDocument = ProjectIcon & Document;

/**
 * ProjectIcon schema for MongoDB
 * Represents project icons
 */
@Schema({ timestamps: true })
export class ProjectIcon {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  iconId: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ProjectIconSchema = SchemaFactory.createForClass(ProjectIcon);
