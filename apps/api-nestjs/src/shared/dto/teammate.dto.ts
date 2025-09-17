import { ObjectType, Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsString, IsOptional, IsEmail } from 'class-validator';
import { Node, Connection, Edge, Cursor } from '../types/common.types';

/**
 * Teammate entity matching Go model exactly
 */
@ObjectType({ implements: Node })
export class Teammate implements Node {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}

/**
 * TeammateConnection matching Go model exactly
 */
@ObjectType()
export class TeammateConnection implements Connection<Teammate> {
  @Field(() => Int)
  totalCount: number;

  @Field(() => PageInfo)
  pageInfo: PageInfo;

  @Field(() => [TeammateEdge])
  edges: TeammateEdge[];
}

/**
 * TeammateEdge matching Go model exactly
 */
@ObjectType()
export class TeammateEdge implements Edge<Teammate> {
  @Field(() => Teammate, { nullable: true })
  node?: Teammate;

  @Field(() => Cursor)
  cursor: Cursor;
}

/**
 * CreateTeammateInput matching Go model exactly
 */
@InputType()
export class CreateTeammateInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  avatar?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  requestId?: string;
}

/**
 * UpdateTeammateInput matching Go model exactly
 */
@InputType()
export class UpdateTeammateInput {
  @Field(() => ID)
  @IsString()
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  avatar?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  requestId?: string;
}

/**
 * PageInfo for pagination
 */
@ObjectType()
export class PageInfo {
  @Field()
  hasNextPage: boolean;

  @Field()
  hasPreviousPage: boolean;

  @Field(() => Cursor, { nullable: true })
  startCursor?: Cursor;

  @Field(() => Cursor, { nullable: true })
  endCursor?: Cursor;
}
