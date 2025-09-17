import { ObjectType, Field, ID, InputType, Int } from '@nestjs/graphql';

/**
 * WorkspaceActivity DTO - represents workspace activity logs
 */
@ObjectType()
export class WorkspaceActivity {
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

  @Field(() => ['WorkspaceActivityTask'], { nullable: true })
  workspaceActivityTasks?: any[];
}

/**
 * WorkspaceActivityConnection DTO for pagination
 */
@ObjectType()
export class WorkspaceActivityConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [WorkspaceActivityEdge])
  edges: WorkspaceActivityEdge[];
}

/**
 * WorkspaceActivityEdge DTO for pagination
 */
@ObjectType()
export class WorkspaceActivityEdge {
  @Field(() => WorkspaceActivity, { nullable: true })
  node?: WorkspaceActivity;

  @Field(() => String)
  cursor: string;
}

/**
 * CreateWorkspaceActivityInput DTO
 */
@InputType()
export class CreateWorkspaceActivityInput {
  @Field(() => ID)
  activityTypeId: string;

  @Field(() => ID)
  teammateId: string;
}

/**
 * UpdateWorkspaceActivityInput DTO
 */
@InputType()
export class UpdateWorkspaceActivityInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID, { nullable: true })
  teammateId?: string;
}
