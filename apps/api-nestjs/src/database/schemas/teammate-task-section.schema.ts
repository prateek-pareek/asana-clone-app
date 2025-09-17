import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TeammateTaskSectionDocument = TeammateTaskSection & Document;

/**
 * TeammateTaskSection schema for MongoDB
 * Represents task sections for teammates
 */
@Schema({ timestamps: true })
export class TeammateTaskSection {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  workspaceId: string;

  @Prop({ required: true })
  teammateId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: false })
  assigned: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const TeammateTaskSectionSchema = SchemaFactory.createForClass(TeammateTaskSection);
