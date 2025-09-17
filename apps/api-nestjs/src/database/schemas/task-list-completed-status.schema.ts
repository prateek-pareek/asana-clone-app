import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskListCompletedStatusDocument = TaskListCompletedStatus & Document;

/**
 * TaskListCompletedStatus schema for MongoDB
 * Represents task completion status options
 */
@Schema({ timestamps: true })
export class TaskListCompletedStatus {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ 
    type: String, 
    enum: ['INCOMPLETE', 'COMPLETED', 'COMPLETED_TODAY', 'COMPLETED_YESTERDAY', 'COMPLETED_1_WEEK', 'COMPLETED_2_WEEKS', 'COMPLETED_3_WEEKS', 'ALL'],
    required: false 
  })
  statusCode?: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const TaskListCompletedStatusSchema = SchemaFactory.createForClass(TaskListCompletedStatus);
