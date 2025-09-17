import { Field, ID, ObjectType, InputType, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

@ObjectType()
export class TaskCollaborator {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  taskId: string;

  @Field(() => ID)
  teammateId: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}

@ObjectType()
export class TaskCollaboratorConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [TaskCollaboratorEdge])
  edges: TaskCollaboratorEdge[];
}

@ObjectType()
export class TaskCollaboratorEdge {
  @Field(() => TaskCollaborator, { nullable: true })
  node?: TaskCollaborator;

  @Field(() => String)
  cursor: string;
}

@InputType()
export class CreateTaskCollaboratorInput {
  @Field(() => ID)
  @IsNotEmpty()
  taskId: string;

  @Field(() => ID)
  @IsNotEmpty()
  teammateId: string;

  @Field(() => String)
  @IsNotEmpty()
  requestId: string;

  @Field(() => ID)
  @IsNotEmpty()
  workspaceId: string;
}

@InputType()
export class UpdateTaskCollaboratorInput {
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
export class DeleteTaskCollaboratorInput {
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