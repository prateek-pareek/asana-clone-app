import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArchivedTaskActivityDocument = ArchivedTaskActivity & Document;

/**
 * ArchivedTaskActivity schema for MongoDB
 * Represents archived task activities
 */
@Schema({ timestamps: true })
export class ArchivedTaskActivity {
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

export const ArchivedTaskActivitySchema = SchemaFactory.createForClass(ArchivedTaskActivity);
