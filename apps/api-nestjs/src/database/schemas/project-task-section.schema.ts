import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectTaskSectionDocument = ProjectTaskSection & Document;

/**
 * ProjectTaskSection schema for MongoDB
 * Represents task sections within projects
 */
@Schema({ timestamps: true })
export class ProjectTaskSection {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  projectId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ProjectTaskSectionSchema = SchemaFactory.createForClass(ProjectTaskSection);
