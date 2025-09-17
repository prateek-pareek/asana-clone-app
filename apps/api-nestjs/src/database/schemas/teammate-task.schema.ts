import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TeammateTaskDocument = TeammateTask & Document;

/**
 * TeammateTask schema for MongoDB
 * Represents the relationship between teammates and tasks
 */
@Schema({ timestamps: true })
export class TeammateTask {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  teammateId: string;

  @Prop({ required: true })
  taskId: string;

  @Prop({ required: true })
  teammateTaskSectionId: string;

  @Prop({ required: true })
  workspaceId: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const TeammateTaskSchema = SchemaFactory.createForClass(TeammateTask);
