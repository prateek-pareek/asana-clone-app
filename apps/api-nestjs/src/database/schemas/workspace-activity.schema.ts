import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WorkspaceActivityDocument = WorkspaceActivity & Document;

/**
 * WorkspaceActivity schema for MongoDB
 * Represents workspace activity logs
 */
@Schema({ timestamps: true })
export class WorkspaceActivity {
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

export const WorkspaceActivitySchema = SchemaFactory.createForClass(WorkspaceActivity);
