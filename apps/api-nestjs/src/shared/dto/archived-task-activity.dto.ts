import { ObjectType, Field, ID, InputType, Int } from '@nestjs/graphql';

/**
 * ArchivedTaskActivity DTO - represents archived task activities
 */
@ObjectType()
export class ArchivedTaskActivity {
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

  @Field(() => ['ArchivedTaskActivityTask'], { nullable: true })
  archivedTaskActivityTasks?: any[];
}

/**
 * ArchivedTaskActivityConnection DTO for pagination
 */
@ObjectType()
export class ArchivedTaskActivityConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [ArchivedTaskActivityEdge])
  edges: ArchivedTaskActivityEdge[];
}

/**
 * ArchivedTaskActivityEdge DTO for pagination
 */
@ObjectType()
export class ArchivedTaskActivityEdge {
  @Field(() => ArchivedTaskActivity, { nullable: true })
  node?: ArchivedTaskActivity;

  @Field(() => String)
  cursor: string;
}

/**
 * CreateArchivedTaskActivityInput DTO
 */
@InputType()
export class CreateArchivedTaskActivityInput {
  @Field(() => ID)
  activityTypeId: string;

  @Field(() => ID)
  teammateId: string;
}

/**
 * UpdateArchivedTaskActivityInput DTO
 */
@InputType()
export class UpdateArchivedTaskActivityInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID, { nullable: true })
  teammateId?: string;
}
