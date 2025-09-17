import { Field, ID, ObjectType, InputType, Int, registerEnumType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

export enum TaskColumnType {
  TASK_NAME = 'TASK_NAME',
  ASSIGNEE = 'ASSIGNEE',
  DUE_DATE = 'DUE_DATE',
  PROJECT = 'PROJECT',
  PROJECTS = 'PROJECTS',
  PRIORITY = 'PRIORITY',
  TAGS = 'TAGS',
  CUSTOM = 'CUSTOM',
}

registerEnumType(TaskColumnType, {
  name: 'TaskColumnType',
});

@ObjectType()
export class TaskColumn {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => TaskColumnType, { nullable: true })
  type?: TaskColumnType;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}

@ObjectType()
export class TaskColumnConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [TaskColumnEdge])
  edges: TaskColumnEdge[];
}

@ObjectType()
export class TaskColumnEdge {
  @Field(() => TaskColumn, { nullable: true })
  node?: TaskColumn;

  @Field(() => String)
  cursor: string;
}

@InputType()
export class CreateTaskColumnInput {
  @Field(() => String)
  @IsNotEmpty()
  name: string;

  @Field(() => TaskColumnType)
  @IsEnum(TaskColumnType)
  type: TaskColumnType;
}

@InputType()
export class UpdateTaskColumnInput {
  @Field(() => ID)
  @IsNotEmpty()
  id: string;

  @Field(() => TaskColumnType, { nullable: true })
  @IsOptional()
  @IsEnum(TaskColumnType)
  type?: TaskColumnType;
}
