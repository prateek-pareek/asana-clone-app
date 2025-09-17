import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';

export type TaskTagDocument = TaskTag & Document;

@ObjectType()
@Schema({ timestamps: true })
export class TaskTag {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  @Prop({ required: true })
  taskId: string;

  @Field(() => ID)
  @Prop({ required: true })
  tagId: string;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}

export const TaskTagSchema = SchemaFactory.createForClass(TaskTag);

TaskTagSchema.pre('save', function (next) {
  if (this.isNew) {
    this.id = this._id.toHexString();
  }
  next();
});
