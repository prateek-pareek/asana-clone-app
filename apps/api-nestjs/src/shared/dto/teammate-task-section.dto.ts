import { ObjectType, Field, ID, InputType, Int, Boolean } from '@nestjs/graphql';

/**
 * TeammateTaskSection DTO - represents task sections for teammates
 */
@ObjectType()
export class TeammateTaskSection {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  workspaceId: string;

  @Field(() => ID)
  teammateId: string;

  @Field(() => String)
  name: string;

  @Field(() => Boolean)
  assigned: boolean;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

  // Relations (forward declarations to avoid circular dependencies)
  @Field(() => 'Workspace', { nullable: true })
  workspace?: any;

  @Field(() => 'Teammate', { nullable: true })
  teammate?: any;

  @Field(() => ['TeammateTask'], { nullable: true })
  teammateTasks?: any[];
}

/**
 * TeammateTaskSectionConnection DTO for pagination
 */
@ObjectType()
export class TeammateTaskSectionConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [TeammateTaskSectionEdge])
  edges: TeammateTaskSectionEdge[];
}

/**
 * TeammateTaskSectionEdge DTO for pagination
 */
@ObjectType()
export class TeammateTaskSectionEdge {
  @Field(() => TeammateTaskSection, { nullable: true })
  node?: TeammateTaskSection;

  @Field(() => String)
  cursor: string;
}

/**
 * CreateTeammateTaskSectionInput DTO
 */
@InputType()
export class CreateTeammateTaskSectionInput {
  @Field(() => ID)
  workspaceId: string;

  @Field(() => ID)
  teammateId: string;

  @Field(() => String)
  requestId: string;
}

/**
 * UpdateTeammateTaskSectionInput DTO
 */
@InputType()
export class UpdateTeammateTaskSectionInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID, { nullable: true })
  workspaceId?: string;

  @Field(() => ID, { nullable: true })
  teammateId?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String)
  requestId: string;
}

/**
 * DeleteTeammateTaskSectionInput DTO
 */
@InputType()
export class DeleteTeammateTaskSectionInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  workspaceId: string;

  @Field(() => String)
  requestId: string;
}

/**
 * DeleteTeammateTaskSectionAndKeepTasksInput DTO
 */
@InputType()
export class DeleteTeammateTaskSectionAndKeepTasksInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  workspaceId: string;

  @Field(() => String)
  requestId: string;
}

/**
 * DeleteTeammateTaskSectionAndKeepTasksPayload DTO
 */
@ObjectType()
export class DeleteTeammateTaskSectionAndKeepTasksPayload {
  @Field(() => TeammateTaskSection)
  teammateTaskSection: TeammateTaskSection;

  @Field(() => TeammateTaskSection)
  keptTeammateTaskSection: TeammateTaskSection;

  @Field(() => [ID])
  teammateTaskIds: string[];
}

/**
 * DeleteTeammateTaskSectionAndDeleteTasksInput DTO
 */
@InputType()
export class DeleteTeammateTaskSectionAndDeleteTasksInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  workspaceId: string;

  @Field(() => String)
  requestId: string;
}

/**
 * DeleteTeammateTaskSectionAndDeleteTasksPayload DTO
 */
@ObjectType()
export class DeleteTeammateTaskSectionAndDeleteTasksPayload {
  @Field(() => TeammateTaskSection)
  teammateTaskSection: TeammateTaskSection;

  @Field(() => [ID])
  teammateTaskIds: string[];

  @Field(() => [ID])
  taskIds: string[];
}

/**
 * UndeleteTeammateTaskSectionAndKeepTasksInput DTO
 */
@InputType()
export class UndeleteTeammateTaskSectionAndKeepTasksInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

  @Field(() => ID)
  teammateId: string;

  @Field(() => [ID])
  keptTeammateTaskIds: string[];

  @Field(() => ID)
  workspaceId: string;

  @Field(() => String)
  requestId: string;
}

/**
 * UndeleteTeammateTaskSectionAndKeepTasksPayload DTO
 */
@ObjectType()
export class UndeleteTeammateTaskSectionAndKeepTasksPayload {
  @Field(() => TeammateTaskSection)
  teammateTaskSection: TeammateTaskSection;

  @Field(() => [ID])
  teammateTaskIds: string[];
}

/**
 * UndeleteTeammateTaskSectionAndDeleteTasksInput DTO
 */
@InputType()
export class UndeleteTeammateTaskSectionAndDeleteTasksInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

  @Field(() => ID)
  teammateId: string;

  @Field(() => ID)
  workspaceId: string;

  @Field(() => [ID])
  deletedTeammateTaskIds: string[];

  @Field(() => [ID])
  deletedTaskIds: string[];

  @Field(() => String)
  requestId: string;
}

/**
 * UndeleteTeammateTaskSectionAndDeleteTasksPayload DTO
 */
@ObjectType()
export class UndeleteTeammateTaskSectionAndDeleteTasksPayload {
  @Field(() => TeammateTaskSection)
  teammateTaskSection: TeammateTaskSection;

  @Field(() => ['TeammateTask'])
  teammateTasks: any[];
}
