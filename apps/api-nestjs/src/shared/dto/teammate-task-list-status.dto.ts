import { ObjectType, Field, ID, InputType, Int } from '@nestjs/graphql';

/**
 * TeammateTaskListStatus DTO - represents teammate task list status
 */
@ObjectType()
export class TeammateTaskListStatus {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  workspaceId: string;

  @Field(() => ID)
  teammateId: string;

  @Field(() => ID)
  taskListCompletedStatusId: string;

  @Field(() => ID)
  taskListSortStatusId: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

  // Relations (forward declarations to avoid circular dependencies)
  @Field(() => 'Workspace', { nullable: true })
  workspace?: any;

  @Field(() => 'Teammate', { nullable: true })
  teammate?: any;

  @Field(() => 'TaskListCompletedStatus', { nullable: true })
  taskListCompletedStatus?: any;

  @Field(() => 'TaskListSortStatus', { nullable: true })
  taskListSortStatus?: any;
}

/**
 * TeammateTaskListStatusConnection DTO for pagination
 */
@ObjectType()
export class TeammateTaskListStatusConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [TeammateTaskListStatusEdge])
  edges: TeammateTaskListStatusEdge[];
}

/**
 * TeammateTaskListStatusEdge DTO for pagination
 */
@ObjectType()
export class TeammateTaskListStatusEdge {
  @Field(() => TeammateTaskListStatus, { nullable: true })
  node?: TeammateTaskListStatus;

  @Field(() => String)
  cursor: string;
}

/**
 * CreateTeammateTaskListStatusInput DTO
 */
@InputType()
export class CreateTeammateTaskListStatusInput {
  @Field(() => ID)
  workspaceId: string;

  @Field(() => ID)
  teammateId: string;

  @Field(() => ID)
  taskListCompletedStatusId: string;

  @Field(() => ID)
  taskListSortStatusId: string;

  @Field(() => String)
  requestId: string;
}

/**
 * UpdateTeammateTaskListStatusInput DTO
 */
@InputType()
export class UpdateTeammateTaskListStatusInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID, { nullable: true })
  teammateId?: string;

  @Field(() => ID, { nullable: true })
  taskListCompletedStatusId?: string;

  @Field(() => ID, { nullable: true })
  taskListSortStatusId?: string;

  @Field(() => String, { nullable: true })
  taskListSortStatusCode?: string;

  @Field(() => String, { nullable: true })
  taskListCompletedStatusCode?: string;

  @Field(() => ID)
  workspaceId: string;

  @Field(() => String)
  requestId: string;
}
