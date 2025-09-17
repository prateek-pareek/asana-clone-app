import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectTaskDocument = ProjectTask & Document;

/**
 * ProjectTask schema for MongoDB
 * Represents the relationship between projects and tasks
 */
@Schema({ timestamps: true })
export class ProjectTask {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  projectId: string;

  @Prop({ required: true })
  taskId: string;

  @Prop({ required: true })
  projectTaskSectionId: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ProjectTaskSchema = SchemaFactory.createForClass(ProjectTask);
