import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IconDocument = Icon & Document;

/**
 * Icon schema matching Go model exactly
 */
@Schema({ collection: 'icons' })
export class Icon {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  url: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const IconSchema = SchemaFactory.createForClass(Icon);
