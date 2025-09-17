import { ObjectType, Field, ID, InputType, Int } from '@nestjs/graphql';

/**
 * ProjectTaskSection DTO - represents task sections within projects
 */
@ObjectType()
export class ProjectTaskSection {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  projectId: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

  // Relations (forward declarations to avoid circular dependencies)
  @Field(() => 'Project', { nullable: true })
  project?: any;

  @Field(() => ['ProjectTask'], { nullable: true })
  projectTasks?: any[];
}

/**
 * ProjectTaskSectionConnection DTO for pagination
 */
@ObjectType()
export class ProjectTaskSectionConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [ProjectTaskSectionEdge])
  edges: ProjectTaskSectionEdge[];
}

/**
 * ProjectTaskSectionEdge DTO for pagination
 */
@ObjectType()
export class ProjectTaskSectionEdge {
  @Field(() => ProjectTaskSection, { nullable: true })
  node?: ProjectTaskSection;

  @Field(() => String)
  cursor: string;
}

/**
 * CreateProjectTaskSectionInput DTO
 */
@InputType()
export class CreateProjectTaskSectionInput {
  @Field(() => ID)
  projectId: string;

  @Field(() => String)
  requestId: string;

  @Field(() => ID)
  workspaceId: string;
}

/**
 * UpdateProjectTaskSectionInput DTO
 */
@InputType()
export class UpdateProjectTaskSectionInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID, { nullable: true })
  projectId?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String)
  requestId: string;

  @Field(() => ID)
  workspaceId: string;
}

/**
 * DeleteProjectTaskSectionInput DTO
 */
@InputType()
export class DeleteProjectTaskSectionInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  workspaceId: string;

  @Field(() => String)
  requestId: string;
}

/**
 * DeleteProjectTaskSectionAndKeepTasksInput DTO
 */
@InputType()
export class DeleteProjectTaskSectionAndKeepTasksInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  workspaceId: string;

  @Field(() => String)
  requestId: string;
}

/**
 * DeleteProjectTaskSectionAndKeepTasksPayload DTO
 */
@ObjectType()
export class DeleteProjectTaskSectionAndKeepTasksPayload {
  @Field(() => ProjectTaskSection)
  projectTaskSection: ProjectTaskSection;

  @Field(() => ProjectTaskSection)
  keptProjectTaskSection: ProjectTaskSection;

  @Field(() => [ID])
  projectTaskIds: string[];
}

/**
 * DeleteProjectTaskSectionAndDeleteTasksInput DTO
 */
@InputType()
export class DeleteProjectTaskSectionAndDeleteTasksInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  workspaceId: string;

  @Field(() => String)
  requestId: string;
}

/**
 * DeleteProjectTaskSectionAndDeleteTasksPayload DTO
 */
@ObjectType()
export class DeleteProjectTaskSectionAndDeleteTasksPayload {
  @Field(() => ProjectTaskSection)
  projectTaskSection: ProjectTaskSection;

  @Field(() => [ID])
  projectTaskIds: string[];

  @Field(() => [ID])
  taskIds: string[];
}

/**
 * UndeleteProjectTaskSectionAndKeepTasksInput DTO
 */
@InputType()
export class UndeleteProjectTaskSectionAndKeepTasksInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

  @Field(() => ID)
  projectId: string;

  @Field(() => [ID])
  keptProjectTaskIds: string[];

  @Field(() => ID)
  workspaceId: string;

  @Field(() => String)
  requestId: string;
}

/**
 * UndeleteProjectTaskSectionAndKeepTasksPayload DTO
 */
@ObjectType()
export class UndeleteProjectTaskSectionAndKeepTasksPayload {
  @Field(() => ProjectTaskSection)
  projectTaskSection: ProjectTaskSection;

  @Field(() => [ID])
  projectTaskIds: string[];
}

/**
 * UndeleteProjectTaskSectionAndDeleteTasksInput DTO
 */
@InputType()
export class UndeleteProjectTaskSectionAndDeleteTasksInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

  @Field(() => ID)
  projectId: string;

  @Field(() => [ID])
  deletedProjectTaskIds: string[];

  @Field(() => [ID])
  deletedTaskIds: string[];

  @Field(() => ID)
  workspaceId: string;

  @Field(() => String)
  requestId: string;
}

/**
 * UndeleteProjectTaskSectionAndDeleteTasksPayload DTO
 */
@ObjectType()
export class UndeleteProjectTaskSectionAndDeleteTasksPayload {
  @Field(() => ProjectTaskSection)
  projectTaskSection: ProjectTaskSection;

  @Field(() => ['ProjectTask'])
  projectTasks: any[];
}
