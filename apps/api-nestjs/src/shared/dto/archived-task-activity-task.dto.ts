import { ObjectType, Field, ID, InputType, Int } from '@nestjs/graphql';

/**
 * ArchivedTaskActivityTask DTO - represents archived task activity tasks
 */
@ObjectType()
export class ArchivedTaskActivityTask {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  archivedTaskActivityId: string;

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
 * ArchivedTaskActivityTaskConnection DTO for pagination
 */
@ObjectType()
export class ArchivedTaskActivityTaskConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [ArchivedTaskActivityTaskEdge])
  edges: ArchivedTaskActivityTaskEdge[];
}

/**
 * ArchivedTaskActivityTaskEdge DTO for pagination
 */
@ObjectType()
export class ArchivedTaskActivityTaskEdge {
  @Field(() => ArchivedTaskActivityTask, { nullable: true })
  node?: ArchivedTaskActivityTask;

  @Field(() => String)
  cursor: string;
}

/**
 * CreateArchivedTaskActivityTaskInput DTO
 */
@InputType()
export class CreateArchivedTaskActivityTaskInput {
  @Field(() => ID)
  archivedTaskActivityId: string;

  @Field(() => ID)
  taskId: string;
}

/**
 * UpdateArchivedTaskActivityTaskInput DTO
 */
@InputType()
export class UpdateArchivedTaskActivityTaskInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID, { nullable: true })
  taskId?: string;
}
