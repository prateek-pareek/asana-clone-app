import { ObjectType, Field, ID, InputType, Int, EnumType } from '@nestjs/graphql';

/**
 * TaskListCompletedStatusCode enum
 */
@EnumType()
export enum TaskListCompletedStatusCode {
  INCOMPLETE = 'INCOMPLETE',
  COMPLETED = 'COMPLETED',
  COMPLETED_TODAY = 'COMPLETED_TODAY',
  COMPLETED_YESTERDAY = 'COMPLETED_YESTERDAY',
  COMPLETED_1_WEEK = 'COMPLETED_1_WEEK',
  COMPLETED_2_WEEKS = 'COMPLETED_2_WEEKS',
  COMPLETED_3_WEEKS = 'COMPLETED_3_WEEKS',
  ALL = 'ALL',
}

/**
 * TaskListCompletedStatus DTO - represents task completion status options
 */
@ObjectType()
export class TaskListCompletedStatus {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => TaskListCompletedStatusCode, { nullable: true })
  statusCode?: TaskListCompletedStatusCode;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}

/**
 * TaskListCompletedStatusConnection DTO for pagination
 */
@ObjectType()
export class TaskListCompletedStatusConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [TaskListCompletedStatusEdge])
  edges: TaskListCompletedStatusEdge[];
}

/**
 * TaskListCompletedStatusEdge DTO for pagination
 */
@ObjectType()
export class TaskListCompletedStatusEdge {
  @Field(() => TaskListCompletedStatus, { nullable: true })
  node?: TaskListCompletedStatus;

  @Field(() => String)
  cursor: string;
}

/**
 * CreateTaskListCompletedStatusInput DTO
 */
@InputType()
export class CreateTaskListCompletedStatusInput {
  @Field(() => String)
  name: string;

  @Field(() => TaskListCompletedStatusCode)
  statusCode: TaskListCompletedStatusCode;
}

/**
 * UpdateTaskListCompletedStatusInput DTO
 */
@InputType()
export class UpdateTaskListCompletedStatusInput {
  @Field(() => ID)
  id: string;

  @Field(() => TaskListCompletedStatusCode, { nullable: true })
  statusCode?: TaskListCompletedStatusCode;
}
