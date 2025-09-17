import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskDocument = Task & Document;

/**
 * Task schema matching Go model exactly
 */
@Schema({ collection: 'tasks' })
export class Task {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: Object, required: true })
  description: Record<string, any>;

  @Prop({ required: true })
  taskParentId: string;

  @Prop({ required: true })
  taskPriorityId: string;

  @Prop({ required: true })
  assigneeId: string;

  @Prop({ required: true })
  createdBy: string;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ required: true })
  completedAt: string;

  @Prop({ default: false })
  isNew: boolean;

  @Prop({ required: true })
  dueDate: string;

  @Prop({ required: true })
  dueTime: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
