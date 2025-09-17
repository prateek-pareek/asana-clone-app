import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';

export type TaskCollaboratorDocument = TaskCollaborator & Document;

@ObjectType()
@Schema({ timestamps: true })
export class TaskCollaborator {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  @Prop({ required: true })
  taskId: string;

  @Field(() => ID)
  @Prop({ required: true })
  teammateId: string;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}

export const TaskCollaboratorSchema = SchemaFactory.createForClass(TaskCollaborator);

TaskCollaboratorSchema.pre('save', function (next) {
  if (this.isNew) {
    this.id = this._id.toHexString();
  }
  next();
});
