import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';

export type TaskLikeDocument = TaskLike & Document;

@ObjectType()
@Schema({ timestamps: true })
export class TaskLike {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  @Prop({ required: true })
  teammateId: string;

  @Field(() => ID)
  @Prop({ required: true })
  workspaceId: string;

  @Field(() => ID)
  @Prop({ required: true })
  taskId: string;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}

export const TaskLikeSchema = SchemaFactory.createForClass(TaskLike);

TaskLikeSchema.pre('save', function (next) {
  if (this.isNew) {
    this.id = this._id.toHexString();
  }
  next();
});
