import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';

export type ActivityTypeDocument = ActivityType & Document;

@ObjectType()
@Schema({ timestamps: true })
export class ActivityType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  @Prop({ required: true })
  name: string;

  @Field(() => String)
  @Prop({ required: true, enum: ['TASK', 'WORKSPACE'] })
  typeCode: string;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}

export const ActivityTypeSchema = SchemaFactory.createForClass(ActivityType);

ActivityTypeSchema.pre('save', function (next) {
  if (this.isNew) {
    this.id = this._id.toHexString();
  }
  next();
});
