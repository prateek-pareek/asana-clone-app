import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';

export type TaskColumnDocument = TaskColumn & Document;

@ObjectType()
@Schema({ timestamps: true })
export class TaskColumn {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  @Prop({ required: true })
  name: string;

  @Field(() => String)
  @Prop({ 
    enum: ['TASK_NAME', 'ASSIGNEE', 'DUE_DATE', 'PROJECT', 'PROJECTS', 'PRIORITY', 'TAGS', 'CUSTOM'],
    required: false 
  })
  type?: string;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}

export const TaskColumnSchema = SchemaFactory.createForClass(TaskColumn);

TaskColumnSchema.pre('save', function (next) {
  if (this.isNew) {
    this.id = this._id.toHexString();
  }
  next();
});
