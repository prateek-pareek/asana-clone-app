import { Field, ID, ObjectType, InputType, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

@ObjectType()
export class TaskFeedLike {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  teammateId: string;

  @Field(() => ID)
  taskId: string;

  @Field(() => ID)
  taskFeedId: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}

@ObjectType()
export class TaskFeedLikeConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [TaskFeedLikeEdge])
  edges: TaskFeedLikeEdge[];
}

@ObjectType()
export class TaskFeedLikeEdge {
  @Field(() => TaskFeedLike, { nullable: true })
  node?: TaskFeedLike;

  @Field(() => String)
  cursor: string;
}

@InputType()
export class CreateTaskFeedLikeInput {
  @Field(() => ID)
  @IsNotEmpty()
  taskId: string;

  @Field(() => ID)
  @IsNotEmpty()
  teammateId: string;

  @Field(() => ID)
  @IsNotEmpty()
  taskFeedId: string;

  @Field(() => String)
  @IsNotEmpty()
  requestId: string;

  @Field(() => ID)
  @IsNotEmpty()
  workspaceId: string;
}

@InputType()
export class UpdateTaskFeedLikeInput {
  @Field(() => ID)
  @IsNotEmpty()
  id: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  taskId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  teammateId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  taskFeedId?: string;

  @Field(() => String)
  @IsNotEmpty()
  requestId: string;

  @Field(() => ID)
  @IsNotEmpty()
  workspaceId: string;
}

@InputType()
export class DeleteTaskFeedLikeInput {
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