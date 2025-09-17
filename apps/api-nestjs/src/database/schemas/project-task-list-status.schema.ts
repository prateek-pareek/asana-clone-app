import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectTaskListStatusDocument = ProjectTaskListStatus & Document;

/**
 * ProjectTaskListStatus schema for MongoDB
 * Represents project task list status
 */
@Schema({ timestamps: true })
export class ProjectTaskListStatus {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  projectId: string;

  @Prop({ required: true })
  taskListCompletedStatusId: string;

  @Prop({ required: true })
  taskListSortStatusId: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ProjectTaskListStatusSchema = SchemaFactory.createForClass(ProjectTaskListStatus);
