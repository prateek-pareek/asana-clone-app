import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';

export type TaskFeedLikeDocument = TaskFeedLike & Document;

@ObjectType()
@Schema({ timestamps: true })
export class TaskFeedLike {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  @Prop({ required: true })
  teammateId: string;

  @Field(() => ID)
  @Prop({ required: true })
  taskId: string;

  @Field(() => ID)
  @Prop({ required: true })
  taskFeedId: string;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}

export const TaskFeedLikeSchema = SchemaFactory.createForClass(TaskFeedLike);

TaskFeedLikeSchema.pre('save', function (next) {
  if (this.isNew) {
    this.id = this._id.toHexString();
  }
  next();
});
