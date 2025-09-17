import { ObjectType, Field, ID, InputType, Int } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

/**
 * ProjectTask DTO - represents the relationship between projects and tasks
 */
@ObjectType()
export class ProjectTask {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  projectId: string;

  @Field(() => ID)
  taskId: string;

  @Field(() => ID)
  projectTaskSectionId: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

  // Relations (forward declarations to avoid circular dependencies)
  @Field(() => 'Project', { nullable: true })
  project?: any;

  @Field(() => 'Task', { nullable: true })
  task?: any;

  @Field(() => 'ProjectTaskSection', { nullable: true })
  projectTaskSection?: any;
}

/**
 * ProjectTaskConnection DTO for pagination
 */
@ObjectType()
export class ProjectTaskConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [ProjectTaskEdge])
  edges: ProjectTaskEdge[];
}

/**
 * ProjectTaskEdge DTO for pagination
 */
@ObjectType()
export class ProjectTaskEdge {
  @Field(() => ProjectTask, { nullable: true })
  node?: ProjectTask;

  @Field(() => String)
  cursor: string;
}

/**
 * CreateProjectTaskInput DTO
 */
@InputType()
export class CreateProjectTaskInput {
  @Field(() => ID)
  projectId: string;

  @Field(() => ID)
  projectTaskSectionId: string;

  @Field(() => ID)
  createdBy: string;

  @Field(() => ID)
  workspaceId: string;

  @Field(() => ID, { nullable: true })
  taskParentId?: string;

  @Field(() => String)
  requestId: string;
}

/**
 * CreateProjectTaskByTaskIDInput DTO
 */
@InputType()
export class CreateProjectTaskByTaskIDInput {
  @Field(() => ID)
  projectId: string;

  @Field(() => ID)
  taskId: string;

  @Field(() => ID)
  workspaceId: string;

  @Field(() => String)
  requestId: string;
}

/**
 * UpdateProjectTaskInput DTO
 */
@InputType()
export class UpdateProjectTaskInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  workspaceId: string;

  @Field(() => ID, { nullable: true })
  taskId?: string;

  @Field(() => ID, { nullable: true })
  projectId?: string;

  @Field(() => ID, { nullable: true })
  projectTaskSectionId?: string;

  @Field(() => String)
  requestId: string;
}

/**
 * DeleteProjectTaskInput DTO
 */
@InputType()
export class DeleteProjectTaskInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  workspaceId: string;

  @Field(() => String)
  requestId: string;
}