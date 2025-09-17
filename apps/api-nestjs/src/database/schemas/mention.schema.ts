import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';

export type MentionDocument = Mention & Document;

@ObjectType()
@Schema({ timestamps: false })
export class Mention {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  @Prop({ required: true })
  projectId: string;

  @Field(() => Number)
  @Prop({ required: true })
  type: number;

  @Field(() => String)
  @Prop({ required: true })
  text: string;

  @Field(() => String)
  @Prop({ required: true })
  title: string;

  @Field(() => String)
  @Prop({ required: true })
  subtitle: string;

  @Field(() => String)
  @Prop({ required: true })
  href: string;

  @Field(() => String)
  @Prop({ required: true })
  image: string;

  @Field(() => Boolean)
  @Prop({ default: false })
  completed: boolean;
}

export const MentionSchema = SchemaFactory.createForClass(Mention);

MentionSchema.pre('save', function (next) {
  if (this.isNew) {
    this.id = this._id.toHexString();
  }
  next();
});