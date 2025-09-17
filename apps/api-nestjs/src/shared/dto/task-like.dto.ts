import { Field, ID, ObjectType, InputType, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

@ObjectType()
export class TaskLike {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  teammateId: string;

  @Field(() => ID)
  workspaceId: string;

  @Field(() => ID)
  taskId: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}

@ObjectType()
export class TaskLikeConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [TaskLikeEdge])
  edges: TaskLikeEdge[];
}

@ObjectType()
export class TaskLikeEdge {
  @Field(() => TaskLike, { nullable: true })
  node?: TaskLike;

  @Field(() => String)
  cursor: string;
}

@InputType()
export class CreateTaskLikeInput {
  @Field(() => ID)
  @IsNotEmpty()
  taskId: string;

  @Field(() => ID)
  @IsNotEmpty()
  teammateId: string;

  @Field(() => ID)
  @IsNotEmpty()
  workspaceId: string;

  @Field(() => String)
  @IsNotEmpty()
  requestId: string;
}

@InputType()
export class UpdateTaskLikeInput {
  @Field(() => ID)
  @IsNotEmpty()
  id: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  taskId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  teammateId?: string;

  @Field(() => String)
  @IsNotEmpty()
  requestId: string;

  @Field(() => ID)
  @IsNotEmpty()
  workspaceId: string;
}

@InputType()
export class DeleteTaskLikeInput {
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