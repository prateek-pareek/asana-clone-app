import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WorkspaceActivityTaskDocument = WorkspaceActivityTask & Document;

/**
 * WorkspaceActivityTask schema for MongoDB
 * Represents workspace activity tasks
 */
@Schema({ timestamps: true })
export class WorkspaceActivityTask {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  workspaceActivityId: string;

  @Prop({ required: true })
  taskId: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const WorkspaceActivityTaskSchema = SchemaFactory.createForClass(WorkspaceActivityTask);
