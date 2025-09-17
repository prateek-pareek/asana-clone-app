import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DeletedTaskDocument = DeletedTask & Document;

/**
 * DeletedTask schema for MongoDB
 * Represents deleted task tracking
 */
@Schema({ timestamps: true })
export class DeletedTask {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  taskId: string;

  @Prop({ required: true })
  workspaceId: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const DeletedTaskSchema = SchemaFactory.createForClass(DeletedTask);
