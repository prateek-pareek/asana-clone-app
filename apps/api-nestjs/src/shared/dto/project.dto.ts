import { ObjectType, Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsString, IsOptional, IsArray } from 'class-validator';
import { Node, Connection, Edge, Cursor } from '../types/common.types';

/**
 * Project entity matching Go model exactly
 */
@ObjectType({ implements: Node })
export class Project implements Node {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}

/**
 * ProjectConnection matching Go model exactly
 */
@ObjectType()
export class ProjectConnection implements Connection<Project> {
  @Field(() => Int)
  totalCount: number;

  @Field(() => PageInfo)
  pageInfo: PageInfo;

  @Field(() => [ProjectEdge])
  edges: ProjectEdge[];
}

/**
 * ProjectEdge matching Go model exactly
 */
@ObjectType()
export class ProjectEdge implements Edge<Project> {
  @Field(() => Project, { nullable: true })
  node?: Project;

  @Field(() => Cursor)
  cursor: Cursor;
}

/**
 * CreateProjectInput matching Go model exactly
 */
@InputType()
export class CreateProjectInput {
  @Field()
  @IsString()
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  requestId?: string;
}

/**
 * UpdateProjectInput matching Go model exactly
 */
@InputType()
export class UpdateProjectInput {
  @Field(() => ID)
  @IsString()
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  requestId?: string;
}

/**
 * ProjectWhereInput for filtering
 */
@InputType()
export class ProjectWhereInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsString()
  id?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;
}

import { PageInfo } from '../types/common.types';
