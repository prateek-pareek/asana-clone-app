import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';

export type TaskFileDocument = TaskFile & Document;

@ObjectType()
@Schema({ timestamps: true })
export class TaskFile {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  @Prop({ required: true })
  name: string;

  @Field(() => String)
  @Prop({ required: true })
  src: string;

  @Field(() => ID)
  @Prop({ required: true })
  taskId: string;

  @Field(() => ID)
  @Prop({ required: true })
  projectId: string;

  @Field(() => ID)
  @Prop({ required: true })
  taskFeedId: string;

  @Field(() => ID)
  @Prop({ required: true })
  fileTypeId: string;

  @Field(() => Boolean)
  @Prop({ default: false })
  attached: boolean;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}

export const TaskFileSchema = SchemaFactory.createForClass(TaskFile);

TaskFileSchema.pre('save', function (next) {
  if (this.isNew) {
    this.id = this._id.toHexString();
  }
  next();
});
