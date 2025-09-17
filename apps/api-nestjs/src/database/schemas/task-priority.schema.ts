import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';

export type TaskPriorityDocument = TaskPriority & Document;

@ObjectType()
@Schema({ timestamps: true })
export class TaskPriority {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  @Prop({ required: true })
  name: string;

  @Field(() => String)
  @Prop({ required: true, enum: ['LOW', 'MEDIUM', 'HIGH'] })
  priorityType: string;

  @Field(() => ID)
  @Prop({ required: true })
  colorId: string;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}

export const TaskPrioritySchema = SchemaFactory.createForClass(TaskPriority);

TaskPrioritySchema.pre('save', function (next) {
  if (this.isNew) {
    this.id = this._id.toHexString();
  }
  next();
});
