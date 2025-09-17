import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskActivityDocument = TaskActivity & Document;

/**
 * TaskActivity schema for MongoDB
 * Represents task activity logs
 */
@Schema({ timestamps: true })
export class TaskActivity {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  activityTypeId: string;

  @Prop({ required: true })
  teammateId: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const TaskActivitySchema = SchemaFactory.createForClass(TaskActivity);
