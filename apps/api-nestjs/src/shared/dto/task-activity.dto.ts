import { ObjectType, Field, ID, InputType, Int } from '@nestjs/graphql';

/**
 * TaskActivity DTO - represents task activity logs
 */
@ObjectType()
export class TaskActivity {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  activityTypeId: string;

  @Field(() => ID)
  teammateId: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

  // Relations (forward declarations to avoid circular dependencies)
  @Field(() => 'ActivityType', { nullable: true })
  activityType?: any;

  @Field(() => ['TaskActivityTask'], { nullable: true })
  taskActivityTasks?: any[];
}

/**
 * TaskActivityConnection DTO for pagination
 */
@ObjectType()
export class TaskActivityConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [TaskActivityEdge])
  edges: TaskActivityEdge[];
}

/**
 * TaskActivityEdge DTO for pagination
 */
@ObjectType()
export class TaskActivityEdge {
  @Field(() => TaskActivity, { nullable: true })
  node?: TaskActivity;

  @Field(() => String)
  cursor: string;
}

/**
 * CreateTaskActivityInput DTO
 */
@InputType()
export class CreateTaskActivityInput {
  @Field(() => ID)
  activityTypeId: string;

  @Field(() => ID)
  teammateId: string;
}

/**
 * UpdateTaskActivityInput DTO
 */
@InputType()
export class UpdateTaskActivityInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID, { nullable: true })
  teammateId?: string;
}
