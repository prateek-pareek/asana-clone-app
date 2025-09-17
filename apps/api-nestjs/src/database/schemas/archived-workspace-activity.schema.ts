import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArchivedWorkspaceActivityDocument = ArchivedWorkspaceActivity & Document;

/**
 * ArchivedWorkspaceActivity schema for MongoDB
 * Represents archived workspace activities
 */
@Schema({ timestamps: true })
export class ArchivedWorkspaceActivity {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  activityTypeId: string;

  @Prop({ required: true })
  workspaceId: string;

  @Prop({ required: true })
  projectId: string;

  @Prop({ required: true })
  teammateId: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ArchivedWorkspaceActivitySchema = SchemaFactory.createForClass(ArchivedWorkspaceActivity);
