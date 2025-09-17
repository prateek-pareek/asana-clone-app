import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskActivityTaskDocument = TaskActivityTask & Document;

/**
 * TaskActivityTask schema for MongoDB
 * Represents task activity tasks
 */
@Schema({ timestamps: true })
export class TaskActivityTask {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  taskActivityId: string;

  @Prop({ required: true })
  taskId: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const TaskActivityTaskSchema = SchemaFactory.createForClass(TaskActivityTask);
