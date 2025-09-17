import { ObjectType, Field, ID, InputType, Int } from '@nestjs/graphql';

/**
 * ProjectTaskListStatus DTO - represents project task list status
 */
@ObjectType()
export class ProjectTaskListStatus {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  projectId: string;

  @Field(() => ID)
  taskListCompletedStatusId: string;

  @Field(() => ID)
  taskListSortStatusId: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

  // Relations (forward declarations to avoid circular dependencies)
  @Field(() => 'Project', { nullable: true })
  project?: any;

  @Field(() => 'TaskListCompletedStatus', { nullable: true })
  taskListCompletedStatus?: any;

  @Field(() => 'TaskListSortStatus', { nullable: true })
  taskListSortStatus?: any;
}

/**
 * ProjectTaskListStatusConnection DTO for pagination
 */
@ObjectType()
export class ProjectTaskListStatusConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [ProjectTaskListStatusEdge])
  edges: ProjectTaskListStatusEdge[];
}

/**
 * ProjectTaskListStatusEdge DTO for pagination
 */
@ObjectType()
export class ProjectTaskListStatusEdge {
  @Field(() => ProjectTaskListStatus, { nullable: true })
  node?: ProjectTaskListStatus;

  @Field(() => String)
  cursor: string;
}

/**
 * CreateProjectTaskListStatusInput DTO
 */
@InputType()
export class CreateProjectTaskListStatusInput {
  @Field(() => ID)
  projectId: string;

  @Field(() => ID)
  taskListCompletedStatusId: string;

  @Field(() => ID)
  taskListSortStatusId: string;

  @Field(() => String)
  requestId: string;
}

/**
 * UpdateProjectTaskListStatusInput DTO
 */
@InputType()
export class UpdateProjectTaskListStatusInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID, { nullable: true })
  projectId?: string;

  @Field(() => ID, { nullable: true })
  taskListCompletedStatusId?: string;

  @Field(() => ID, { nullable: true })
  taskListSortStatusId?: string;

  @Field(() => String)
  requestId: string;
}
