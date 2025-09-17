import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TeammateDocument = Teammate & Document;

/**
 * Teammate schema matching Go model exactly
 */
@Schema({ collection: 'teammates' })
export class Teammate {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  avatar?: string;

  @Prop({ default: () => new Date().toISOString() })
  createdAt: string;

  @Prop({ default: () => new Date().toISOString() })
  updatedAt: string;
}

export const TeammateSchema = SchemaFactory.createForClass(Teammate);
