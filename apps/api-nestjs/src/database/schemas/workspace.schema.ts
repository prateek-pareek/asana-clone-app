import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WorkspaceDocument = Workspace & Document;

/**
 * Workspace schema matching Go model exactly
 */
@Schema({ collection: 'workspaces' })
export class Workspace {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);
