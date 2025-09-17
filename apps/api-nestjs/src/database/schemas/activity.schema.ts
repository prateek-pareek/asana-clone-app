import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ActivityDocument = Activity & Document;

/**
 * Activity schema matching Go model exactly
 */
@Schema({ collection: 'activities' })
export class Activity {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
