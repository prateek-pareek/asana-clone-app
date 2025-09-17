import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FavoriteProjectDocument = FavoriteProject & Document;

/**
 * FavoriteProject schema for MongoDB
 * Represents favorite projects
 */
@Schema({ timestamps: true })
export class FavoriteProject {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  projectId: string;

  @Prop({ required: true })
  teammateId: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const FavoriteProjectSchema = SchemaFactory.createForClass(FavoriteProject);
