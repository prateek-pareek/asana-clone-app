import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';

export type TestUserDocument = TestUser & Document;

@ObjectType()
@Schema({ timestamps: true })
export class TestUser {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  @Prop({ required: true })
  name: string;

  @Field(() => Number)
  @Prop({ required: true })
  age: number;

  @Field(() => Object)
  @Prop({ type: Object, required: true })
  profile: {
    address?: string;
    phone?: string;
    body?: {
      weight?: number;
      height?: number;
      comment?: {
        type?: string;
        text?: string;
      };
    };
  };

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  description?: string;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}

export const TestUserSchema = SchemaFactory.createForClass(TestUser);

TestUserSchema.pre('save', function (next) {
  if (this.isNew) {
    this.id = this._id.toHexString();
  }
  next();
});
