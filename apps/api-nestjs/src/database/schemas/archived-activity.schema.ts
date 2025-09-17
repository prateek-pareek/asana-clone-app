import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArchivedActivityDocument = ArchivedActivity & Document;

/**
 * ArchivedActivity schema for MongoDB
 * Represents archived activities
 */
@Schema({ timestamps: true })
export class ArchivedActivity {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  type: string;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ArchivedActivitySchema = SchemaFactory.createForClass(ArchivedActivity);
