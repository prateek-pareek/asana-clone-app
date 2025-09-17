import { ObjectType, Field, ID, InputType, Int } from '@nestjs/graphql';

/**
 * ArchivedWorkspaceActivity DTO - represents archived workspace activities
 */
@ObjectType()
export class ArchivedWorkspaceActivity {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  activityTypeId: string;

  @Field(() => ID)
  workspaceId: string;

  @Field(() => ID)
  projectId: string;

  @Field(() => ID)
  teammateId: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

  // Relations (forward declarations to avoid circular dependencies)
  @Field(() => 'ActivityType', { nullable: true })
  activityType?: any;

  @Field(() => 'Workspace', { nullable: true })
  workspace?: any;

  @Field(() => 'Project', { nullable: true })
  project?: any;

  @Field(() => 'Teammate', { nullable: true })
  teammate?: any;

  @Field(() => ['ArchivedWorkspaceActivityTask'], { nullable: true })
  archivedWorkspaceActivityTasks?: any[];
}

/**
 * ArchivedWorkspaceActivityConnection DTO for pagination
 */
@ObjectType()
export class ArchivedWorkspaceActivityConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [ArchivedWorkspaceActivityEdge])
  edges: ArchivedWorkspaceActivityEdge[];
}

/**
 * ArchivedWorkspaceActivityEdge DTO for pagination
 */
@ObjectType()
export class ArchivedWorkspaceActivityEdge {
  @Field(() => ArchivedWorkspaceActivity, { nullable: true })
  node?: ArchivedWorkspaceActivity;

  @Field(() => String)
  cursor: string;
}

/**
 * CreateArchivedWorkspaceActivityInput DTO
 */
@InputType()
export class CreateArchivedWorkspaceActivityInput {
  @Field(() => ID)
  activityTypeId: string;

  @Field(() => ID)
  teammateId: string;
}

/**
 * UpdateArchivedWorkspaceActivityInput DTO
 */
@InputType()
export class UpdateArchivedWorkspaceActivityInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID, { nullable: true })
  teammateId?: string;
}
