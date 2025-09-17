import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArchivedTaskActivityTaskDocument = ArchivedTaskActivityTask & Document;

/**
 * ArchivedTaskActivityTask schema for MongoDB
 * Represents archived task activity tasks
 */
@Schema({ timestamps: true })
export class ArchivedTaskActivityTask {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  archivedTaskActivityId: string;

  @Prop({ required: true })
  taskId: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ArchivedTaskActivityTaskSchema = SchemaFactory.createForClass(ArchivedTaskActivityTask);
