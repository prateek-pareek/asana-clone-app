import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';

export type TaskSectionDocument = TaskSection & Document;

@ObjectType()
@Schema({ timestamps: true })
export class TaskSection {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  @Prop({ required: true })
  name: string;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}

export const TaskSectionSchema = SchemaFactory.createForClass(TaskSection);

TaskSectionSchema.pre('save', function (next) {
  if (this.isNew) {
    this.id = this._id.toHexString();
  }
  next();
});
