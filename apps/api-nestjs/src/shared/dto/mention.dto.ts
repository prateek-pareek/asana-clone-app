import { Field, ID, ObjectType, InputType, Int } from '@nestjs/graphql';
import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

@ObjectType()
export class Mention {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  projectId: string;

  @Field(() => Int)
  type: number;

  @Field(() => String)
  text: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  subtitle: string;

  @Field(() => String)
  href: string;

  @Field(() => String)
  image: string;

  @Field(() => Boolean)
  completed: boolean;
}

@InputType()
export class MentionWhereInput {
  @Field(() => ID)
  @IsNotEmpty()
  workspaceId: string;

  @Field(() => String)
  @IsNotEmpty()
  query: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  limit?: number;
}
