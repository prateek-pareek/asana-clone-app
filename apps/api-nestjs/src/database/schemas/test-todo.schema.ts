import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';

export type TestTodoDocument = TestTodo & Document;

@ObjectType()
@Schema({ timestamps: true })
export class TestTodo {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  @Prop({ required: true })
  name: string;

  @Field(() => String)
  @Prop({ required: true, enum: ['IN_PROGRESS', 'COMPLETED'], default: 'IN_PROGRESS' })
  status: string;

  @Field(() => Number)
  @Prop({ required: true })
  priority: number;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  testUserID?: string;

  @Field(() => String)
  @Prop({ required: true })
  parentToDoId: string;

  @Field(() => Date, { nullable: true })
  @Prop({ type: Date })
  dueDate?: Date;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}

export const TestTodoSchema = SchemaFactory.createForClass(TestTodo);

TestTodoSchema.pre('save', function (next) {
  if (this.isNew) {
    this.id = this._id.toHexString();
  }
  next();
});
