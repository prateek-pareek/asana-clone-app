import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

/**
 * Project schema matching Go model exactly
 */
@Schema({ collection: 'projects' })
export class Project {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: () => new Date().toISOString() })
  createdAt: string;

  @Prop({ default: () => new Date().toISOString() })
  updatedAt: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
