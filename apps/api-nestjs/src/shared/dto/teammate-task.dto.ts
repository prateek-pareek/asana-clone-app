import { ObjectType, Field, ID, InputType, Int } from '@nestjs/graphql';

/**
 * TeammateTask DTO - represents the relationship between teammates and tasks
 */
@ObjectType()
export class TeammateTask {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  teammateId: string;

  @Field(() => ID)
  taskId: string;

  @Field(() => ID)
  teammateTaskSectionId: string;

  @Field(() => ID)
  workspaceId: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

  // Relations (forward declarations to avoid circular dependencies)
  @Field(() => 'Teammate', { nullable: true })
  teammate?: any;

  @Field(() => 'Task', { nullable: true })
  task?: any;

  @Field(() => 'TeammateTaskSection', { nullable: true })
  teammateTaskSection?: any;
}

/**
 * TeammateTaskConnection DTO for pagination
 */
@ObjectType()
export class TeammateTaskConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [TeammateTaskEdge])
  edges: TeammateTaskEdge[];
}

/**
 * TeammateTaskEdge DTO for pagination
 */
@ObjectType()
export class TeammateTaskEdge {
  @Field(() => TeammateTask, { nullable: true })
  node?: TeammateTask;

  @Field(() => String)
  cursor: string;
}

/**
 * CreateTeammateTaskInput DTO
 */
@InputType()
export class CreateTeammateTaskInput {
  @Field(() => ID)
  teammateId: string;

  @Field(() => ID)
  teammateTaskSectionId: string;

  @Field(() => ID)
  workspaceId: string;

  @Field(() => ID, { nullable: true })
  taskParentId?: string;

  @Field(() => String)
  requestId: string;
}

/**
 * UpdateTeammateTaskInput DTO
 */
@InputType()
export class UpdateTeammateTaskInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID, { nullable: true })
  taskId?: string;

  @Field(() => ID, { nullable: true })
  teammateId?: string;

  @Field(() => ID, { nullable: true })
  teammateTaskSectionId?: string;

  @Field(() => String)
  requestId: string;

  @Field(() => ID)
  workspaceId: string;
}

/**
 * DeleteTeammateTaskInput DTO
 */
@InputType()
export class DeleteTeammateTaskInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  taskId: string;

  @Field(() => ID)
  teammateId: string;

  @Field(() => ID)
  workspaceId: string;

  @Field(() => String)
  requestId: string;
}