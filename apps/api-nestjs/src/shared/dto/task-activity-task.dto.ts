import { ObjectType, Field, ID, InputType, Int } from '@nestjs/graphql';

/**
 * TaskActivityTask DTO - represents task activity tasks
 */
@ObjectType()
export class TaskActivityTask {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  taskActivityId: string;

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
 * TaskActivityTaskConnection DTO for pagination
 */
@ObjectType()
export class TaskActivityTaskConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [TaskActivityTaskEdge])
  edges: TaskActivityTaskEdge[];
}

/**
 * TaskActivityTaskEdge DTO for pagination
 */
@ObjectType()
export class TaskActivityTaskEdge {
  @Field(() => TaskActivityTask, { nullable: true })
  node?: TaskActivityTask;

  @Field(() => String)
  cursor: string;
}

/**
 * CreateTaskActivityTaskInput DTO
 */
@InputType()
export class CreateTaskActivityTaskInput {
  @Field(() => ID)
  taskActivityId: string;

  @Field(() => ID)
  taskId: string;
}

/**
 * UpdateTaskActivityTaskInput DTO
 */
@InputType()
export class UpdateTaskActivityTaskInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID, { nullable: true })
  taskId?: string;
}
