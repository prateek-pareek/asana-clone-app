import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';

export type TaskFeedDocument = TaskFeed & Document;

@ObjectType()
@Schema({ timestamps: true })
export class TaskFeed {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  @Prop({ required: true })
  teammateId: string;

  @Field(() => ID)
  @Prop({ required: true })
  taskId: string;

  @Field(() => String)
  @Prop({ required: true })
  description: string;

  @Field(() => Boolean)
  @Prop({ default: false })
  isFirst: boolean;

  @Field(() => Boolean)
  @Prop({ default: false })
  isPinned: boolean;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}

export const TaskFeedSchema = SchemaFactory.createForClass(TaskFeed);

TaskFeedSchema.pre('save', function (next) {
  if (this.isNew) {
    this.id = this._id.toHexString();
  }
  next();
});
