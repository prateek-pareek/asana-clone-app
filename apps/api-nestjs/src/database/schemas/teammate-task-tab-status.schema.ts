import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TeammateTaskTabStatusDocument = TeammateTaskTabStatus & Document;

/**
 * TeammateTaskTabStatus schema for MongoDB
 * Represents teammate task tab status
 */
@Schema({ timestamps: true })
export class TeammateTaskTabStatus {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  workspaceId: string;

  @Prop({ required: true })
  teammateId: string;

  @Prop({ 
    type: String, 
    enum: ['LIST', 'BOARD', 'CALENDAR', 'FILES'],
    default: 'LIST'
  })
  statusCode?: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const TeammateTaskTabStatusSchema = SchemaFactory.createForClass(TeammateTaskTabStatus);
