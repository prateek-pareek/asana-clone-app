import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';
import { IsString, IsOptional, IsEmail } from 'class-validator';
import { Node } from '../types/common.types';

/**
 * Me entity matching Go model exactly
 */
@ObjectType({ implements: Node })
export class Me implements Node {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  image: string;

  @Field()
  email: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}

/**
 * UpdateMeInput matching Go model exactly
 */
@InputType()
export class UpdateMeInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  image?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;
}
