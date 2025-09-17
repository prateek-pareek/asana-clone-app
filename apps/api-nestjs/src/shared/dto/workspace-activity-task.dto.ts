import { ObjectType, Field, ID, InputType, Int } from '@nestjs/graphql';

/**
 * WorkspaceActivityTask DTO - represents workspace activity tasks
 */
@ObjectType()
export class WorkspaceActivityTask {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  workspaceActivityId: string;

  @Field(() => ID)
  taskId: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

  // Relations (forward declarations to avoid circular dependencies)
  @Field(() => 'Task', { nullable: true })
  task?: any;
}

/**
 * WorkspaceActivityTaskConnection DTO for pagination
 */
@ObjectType()
export class WorkspaceActivityTaskConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [WorkspaceActivityTaskEdge])
  edges: WorkspaceActivityTaskEdge[];
}

/**
 * WorkspaceActivityTaskEdge DTO for pagination
 */
@ObjectType()
export class WorkspaceActivityTaskEdge {
  @Field(() => WorkspaceActivityTask, { nullable: true })
  node?: WorkspaceActivityTask;

  @Field(() => String)
  cursor: string;
}

/**
 * CreateWorkspaceActivityTaskInput DTO
 */
@InputType()
export class CreateWorkspaceActivityTaskInput {
  @Field(() => ID)
  workspaceActivityId: string;

  @Field(() => ID)
  taskId: string;
}

/**
 * UpdateWorkspaceActivityTaskInput DTO
 */
@InputType()
export class UpdateWorkspaceActivityTaskInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID, { nullable: true })
  taskId?: string;
}
