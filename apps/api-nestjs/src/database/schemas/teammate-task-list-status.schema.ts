import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TeammateTaskListStatusDocument = TeammateTaskListStatus & Document;

/**
 * TeammateTaskListStatus schema for MongoDB
 * Represents teammate task list status
 */
@Schema({ timestamps: true })
export class TeammateTaskListStatus {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  workspaceId: string;

  @Prop({ required: true })
  teammateId: string;

  @Prop({ required: true })
  taskListCompletedStatusId: string;

  @Prop({ required: true })
  taskListSortStatusId: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const TeammateTaskListStatusSchema = SchemaFactory.createForClass(TeammateTaskListStatus);
