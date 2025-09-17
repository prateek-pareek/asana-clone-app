import { ObjectType, Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsString, IsOptional, IsArray } from 'class-validator';
import { Node, Connection, Edge, Cursor } from '../types/common.types';

/**
 * Workspace entity matching Go model exactly
 */
@ObjectType({ implements: Node })
export class Workspace implements Node {
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
 * WorkspaceConnection matching Go model exactly
 */
@ObjectType()
export class WorkspaceConnection implements Connection<Workspace> {
  @Field(() => Int)
  totalCount: number;

  @Field(() => PageInfo)
  pageInfo: PageInfo;

  @Field(() => [WorkspaceEdge])
  edges: WorkspaceEdge[];
}

/**
 * WorkspaceEdge matching Go model exactly
 */
@ObjectType()
export class WorkspaceEdge implements Edge<Workspace> {
  @Field(() => Workspace, { nullable: true })
  node?: Workspace;

  @Field(() => Cursor)
  cursor: Cursor;
}

/**
 * CreateWorkspaceInput matching Go model exactly
 */
@InputType()
export class CreateWorkspaceInput {
  @Field()
  @IsString()
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;
}

/**
 * UpdateWorkspaceInput matching Go model exactly
 */
@InputType()
export class UpdateWorkspaceInput {
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
}

/**
 * WorkspaceWhereInput for filtering
 */
@InputType()
export class WorkspaceWhereInput {
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
