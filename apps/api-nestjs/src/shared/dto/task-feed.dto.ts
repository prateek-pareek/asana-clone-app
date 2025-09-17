import { Field, ID, ObjectType, InputType, Int } from '@nestjs/graphql';
import { IsString, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

@ObjectType()
export class TaskFeed {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  teammateId: string;

  @Field(() => ID)
  taskId: string;

  @Field(() => String)
  description: string;

  @Field(() => Boolean)
  isFirst: boolean;

  @Field(() => Boolean)
  isPinned: boolean;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}

@ObjectType()
export class TaskFeedConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [TaskFeedEdge])
  edges: TaskFeedEdge[];
}

@ObjectType()
export class TaskFeedEdge {
  @Field(() => TaskFeed, { nullable: true })
  node?: TaskFeed;

  @Field(() => String)
  cursor: string;
}

@InputType()
export class CreateTaskFeedInput {
  @Field(() => ID)
  @IsNotEmpty()
  taskId: string;

  @Field(() => ID)
  @IsNotEmpty()
  teammateId: string;

  @Field(() => String)
  @IsNotEmpty()
  description: string;

  @Field(() => String)
  @IsNotEmpty()
  requestId: string;

  @Field(() => ID)
  @IsNotEmpty()
  workspaceId: string;
}

@InputType()
export class UpdateTaskFeedInput {
  @Field(() => ID)
  @IsNotEmpty()
  id: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  taskId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  teammateId?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  description?: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  isFirst?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  isPinned?: boolean;

  @Field(() => String)
  @IsNotEmpty()
  requestId: string;

  @Field(() => ID)
  @IsNotEmpty()
  workspaceId: string;
}

@InputType()
export class DeleteTaskFeedInput {
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

@ObjectType()
export class DeleteTaskFeedPayload {
  @Field(() => TaskFeed)
  taskFeed: TaskFeed;

  @Field(() => [String])
  taskFeedLikes: string[];

  @Field(() => [String])
  taskFiles: string[];
}

@InputType()
export class UndeleteTaskFeedInput {
  @Field(() => UndeleteTaskFeedTaskFeedInput)
  taskFeed: UndeleteTaskFeedTaskFeedInput;

  @Field(() => [UndeleteTaskFeedTaskFeedLikeInput])
  taskFeedLikes: UndeleteTaskFeedTaskFeedLikeInput[];

  @Field(() => [UndeleteTaskFeedTaskFileInput])
  taskFiles: UndeleteTaskFeedTaskFileInput[];

  @Field(() => String)
  @IsNotEmpty()
  requestId: string;

  @Field(() => ID)
  @IsNotEmpty()
  workspaceId: string;
}

@InputType()
export class UndeleteTaskFeedTaskFeedInput {
  @Field(() => ID)
  @IsNotEmpty()
  id: string;

  @Field(() => ID)
  @IsNotEmpty()
  taskId: string;

  @Field(() => ID)
  @IsNotEmpty()
  teammateId: string;

  @Field(() => String)
  @IsNotEmpty()
  description: string;

  @Field(() => Boolean)
  isFirst: boolean;

  @Field(() => Boolean)
  isPinned: boolean;

  @Field(() => String)
  @IsNotEmpty()
  createdAt: string;

  @Field(() => String)
  @IsNotEmpty()
  updatedAt: string;
}

@InputType()
export class UndeleteTaskFeedTaskFeedLikeInput {
  @Field(() => ID)
  @IsNotEmpty()
  id: string;

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
  createdAt: string;

  @Field(() => String)
  @IsNotEmpty()
  updatedAt: string;
}

@InputType()
export class UndeleteTaskFeedTaskFileInput {
  @Field(() => ID)
  @IsNotEmpty()
  id: string;

  @Field(() => String)
  @IsNotEmpty()
  name: string;

  @Field(() => String)
  @IsNotEmpty()
  src: string;

  @Field(() => ID)
  @IsNotEmpty()
  taskId: string;

  @Field(() => ID)
  @IsNotEmpty()
  projectId: string;

  @Field(() => ID)
  @IsNotEmpty()
  taskFeedId: string;

  @Field(() => ID)
  @IsNotEmpty()
  fileTypeId: string;

  @Field(() => Boolean)
  attached: boolean;

  @Field(() => String)
  @IsNotEmpty()
  createdAt: string;

  @Field(() => String)
  @IsNotEmpty()
  updatedAt: string;
}

@ObjectType()
export class UndeleteTaskFeedPayload {
  @Field(() => TaskFeed)
  taskFeed: TaskFeed;

  @Field(() => [String])
  taskFeedLikes: string[];

  @Field(() => [String])
  taskFiles: string[];
}

// Forward declarations for circular dependencies
// These will be imported when needed to avoid circular dependencies