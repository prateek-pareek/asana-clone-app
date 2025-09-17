import { ObjectType, Field, ID, InputType, Int } from '@nestjs/graphql';

/**
 * DeletedTask DTO - represents deleted task tracking
 */
@ObjectType()
export class DeletedTask {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  taskId: string;

  @Field(() => ID)
  workspaceId: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

  // Relations (forward declarations to avoid circular dependencies)
  @Field(() => 'Task', { nullable: true })
  task?: any;
}

/**
 * DeletedTaskConnection DTO for pagination
 */
@ObjectType()
export class DeletedTaskConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [DeletedTaskEdge])
  edges: DeletedTaskEdge[];
}

/**
 * DeletedTaskEdge DTO for pagination
 */
@ObjectType()
export class DeletedTaskEdge {
  @Field(() => DeletedTask, { nullable: true })
  node?: DeletedTask;

  @Field(() => String)
  cursor: string;
}

/**
 * CreateDeletedTaskInput DTO
 */
@InputType()
export class CreateDeletedTaskInput {
  @Field(() => ID)
  taskId: string;

  @Field(() => ID)
  workspaceId: string;

  @Field(() => String)
  requestId: string;
}

/**
 * UpdateDeletedTaskInput DTO
 */
@InputType()
export class UpdateDeletedTaskInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID, { nullable: true })
  taskId?: string;

  @Field(() => ID, { nullable: true })
  workspaceId?: string;

  @Field(() => String)
  requestId: string;
}

/**
 * UndeleteDeletedTaskInput DTO
 */
@InputType()
export class UndeleteDeletedTaskInput {
  @Field(() => ID)
  taskId: string;

  @Field(() => String)
  requestId: string;
}