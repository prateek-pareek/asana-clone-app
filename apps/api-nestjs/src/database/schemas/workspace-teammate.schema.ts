import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';

export type WorkspaceTeammateDocument = WorkspaceTeammate & Document;

@ObjectType()
@Schema({ timestamps: true })
export class WorkspaceTeammate {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  @Prop({ required: true })
  workspaceId: string;

  @Field(() => ID)
  @Prop({ required: true })
  teammateId: string;

  @Field(() => String)
  @Prop({ required: true })
  role: string;

  @Field(() => Boolean)
  @Prop({ default: false })
  isOwner: boolean;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}

export const WorkspaceTeammateSchema = SchemaFactory.createForClass(WorkspaceTeammate);

WorkspaceTeammateSchema.pre('save', function (next) {
  if (this.isNew) {
    this.id = this._id.toHexString();
  }
  next();
});
