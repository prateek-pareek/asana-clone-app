import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FavoriteWorkspaceDocument = FavoriteWorkspace & Document;

/**
 * FavoriteWorkspace schema for MongoDB
 * Represents favorite workspaces
 */
@Schema({ timestamps: true })
export class FavoriteWorkspace {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  workspaceId: string;

  @Prop({ required: true })
  teammateId: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const FavoriteWorkspaceSchema = SchemaFactory.createForClass(FavoriteWorkspace);
