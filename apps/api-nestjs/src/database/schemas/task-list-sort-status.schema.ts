import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskListSortStatusDocument = TaskListSortStatus & Document;

/**
 * TaskListSortStatus schema for MongoDB
 * Represents task sorting status options
 */
@Schema({ timestamps: true })
export class TaskListSortStatus {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ 
    type: String, 
    enum: ['NONE', 'DUE_DATE', 'LIKES', 'ALPHABETICAL', 'PROJECT', 'ASSIGNEE', 'CREATION_TIME', 'PRIORITY'],
    required: false 
  })
  statusCode?: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const TaskListSortStatusSchema = SchemaFactory.createForClass(TaskListSortStatus);
