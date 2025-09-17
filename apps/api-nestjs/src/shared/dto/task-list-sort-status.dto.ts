import { ObjectType, Field, ID, InputType, Int, EnumType } from '@nestjs/graphql';

/**
 * TaskListSortStatusCode enum
 */
@EnumType()
export enum TaskListSortStatusCode {
  NONE = 'NONE',
  DUE_DATE = 'DUE_DATE',
  LIKES = 'LIKES',
  ALPHABETICAL = 'ALPHABETICAL',
  PROJECT = 'PROJECT',
  ASSIGNEE = 'ASSIGNEE',
  CREATION_TIME = 'CREATION_TIME',
  PRIORITY = 'PRIORITY',
}

/**
 * TaskListSortStatus DTO - represents task sorting status options
 */
@ObjectType()
export class TaskListSortStatus {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => TaskListSortStatusCode, { nullable: true })
  statusCode?: TaskListSortStatusCode;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}

/**
 * TaskListSortStatusConnection DTO for pagination
 */
@ObjectType()
export class TaskListSortStatusConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [TaskListSortStatusEdge])
  edges: TaskListSortStatusEdge[];
}

/**
 * TaskListSortStatusEdge DTO for pagination
 */
@ObjectType()
export class TaskListSortStatusEdge {
  @Field(() => TaskListSortStatus, { nullable: true })
  node?: TaskListSortStatus;

  @Field(() => String)
  cursor: string;
}

/**
 * CreateTaskListSortStatusInput DTO
 */
@InputType()
export class CreateTaskListSortStatusInput {
  @Field(() => String)
  name: string;

  @Field(() => TaskListSortStatusCode)
  statusCode: TaskListSortStatusCode;
}

/**
 * UpdateTaskListSortStatusInput DTO
 */
@InputType()
export class UpdateTaskListSortStatusInput {
  @Field(() => ID)
  id: string;

  @Field(() => TaskListSortStatusCode, { nullable: true })
  statusCode?: TaskListSortStatusCode;
}
