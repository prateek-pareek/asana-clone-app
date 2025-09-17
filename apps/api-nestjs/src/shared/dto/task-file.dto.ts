import { Field, ID, ObjectType, InputType, Int } from '@nestjs/graphql';
import { IsString, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

@ObjectType()
export class TaskFile {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  src: string;

  @Field(() => ID)
  taskId: string;

  @Field(() => ID)
  projectId: string;

  @Field(() => ID)
  taskFeedId: string;

  @Field(() => ID)
  fileTypeId: string;

  @Field(() => String)
  fileType: string;

  @Field(() => Boolean)
  attached: boolean;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}

@ObjectType()
export class TaskFileConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [TaskFileEdge])
  edges: TaskFileEdge[];
}

@ObjectType()
export class TaskFileEdge {
  @Field(() => TaskFile, { nullable: true })
  node?: TaskFile;

  @Field(() => String)
  cursor: string;
}

@InputType()
export class CreateTaskFileInput {
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
  requestId: string;
}

@InputType()
export class UpdateTaskFileInput {
  @Field(() => ID)
  @IsNotEmpty()
  id: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  name?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  src?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  taskId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  projectId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  taskFeedId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  fileTypeId?: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  attached?: boolean;

  @Field(() => String)
  @IsNotEmpty()
  requestId: string;
}

// Forward declaration for circular dependency
// These will be imported when needed to avoid circular dependencies