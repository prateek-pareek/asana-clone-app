import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ColorDocument = Color & Document;

/**
 * Color schema matching Go model exactly
 */
@Schema({ collection: 'colors' })
export class Color {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  hex: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ColorSchema = SchemaFactory.createForClass(Color);
