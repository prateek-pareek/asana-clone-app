import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TeammateTaskColumnDocument = TeammateTaskColumn & Document;

/**
 * TeammateTaskColumn schema for MongoDB
 * Represents teammate task columns
 */
@Schema({ timestamps: true })
export class TeammateTaskColumn {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  teammateId: string;

  @Prop({ required: true })
  taskColumnId: string;

  @Prop({ required: true })
  width: string;

  @Prop({ required: true, default: false })
  disabled: boolean;

  @Prop({ required: true, default: true })
  customizable: boolean;

  @Prop({ required: true })
  order: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const TeammateTaskColumnSchema = SchemaFactory.createForClass(TeammateTaskColumn);
