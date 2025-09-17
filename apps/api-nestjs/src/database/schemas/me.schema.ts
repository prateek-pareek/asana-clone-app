import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MeDocument = Me & Document;

/**
 * Me schema matching Go model exactly
 */
@Schema({ collection: 'me' })
export class Me {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const MeSchema = SchemaFactory.createForClass(Me);
