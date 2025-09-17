import { Field, ID, ObjectType, InputType, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

@ObjectType()
export class TaskTag {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  taskId: string;

  @Field(() => ID)
  tagId: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}

@ObjectType()
export class TaskTagConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [TaskTagEdge])
  edges: TaskTagEdge[];
}

@ObjectType()
export class TaskTagEdge {
  @Field(() => TaskTag, { nullable: true })
  node?: TaskTag;

  @Field(() => String)
  cursor: string;
}

@InputType()
export class CreateTaskTagInput {
  @Field(() => ID)
  @IsNotEmpty()
  taskId: string;

  @Field(() => ID)
  @IsNotEmpty()
  tagId: string;

  @Field(() => String)
  @IsNotEmpty()
  requestId: string;

  @Field(() => ID)
  @IsNotEmpty()
  workspaceId: string;
}

@InputType()
export class UpdateTaskTagInput {
  @Field(() => ID)
  @IsNotEmpty()
  id: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  taskId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  tagId?: string;

  @Field(() => String)
  @IsNotEmpty()
  requestId: string;

  @Field(() => ID)
  @IsNotEmpty()
  workspaceId: string;
}

@InputType()
export class DeleteTaskTagInput {
  @Field(() => ID)
  @IsNotEmpty()
  id: string;

  @Field(() => String)
  @IsNotEmpty()
  requestId: string;

  @Field(() => ID)
  @IsNotEmpty()
  workspaceId: string;
}