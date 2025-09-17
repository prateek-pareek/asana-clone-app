import { Field, ID, ObjectType, InputType, Int } from '@nestjs/graphql';
import { IsString, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

@ObjectType()
export class WorkspaceTeammate {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  workspaceId: string;

  @Field(() => String)
  workspace: string;

  @Field(() => ID)
  teammateId: string;

  @Field(() => String)
  teammate: string;

  @Field(() => String)
  role: string;

  @Field(() => Boolean)
  isOwner: boolean;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}

@ObjectType()
export class WorkspaceTeammateConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [WorkspaceTeammateEdge])
  edges: WorkspaceTeammateEdge[];
}

@ObjectType()
export class WorkspaceTeammateEdge {
  @Field(() => WorkspaceTeammate, { nullable: true })
  node?: WorkspaceTeammate;

  @Field(() => String)
  cursor: string;
}

@InputType()
export class CreateWorkspaceTeammateInput {
  @Field(() => ID)
  @IsNotEmpty()
  workspaceId: string;

  @Field(() => ID)
  @IsNotEmpty()
  teammateId: string;

  @Field(() => String)
  @IsNotEmpty()
  role: string;

  @Field(() => Boolean)
  isOwner: boolean;

  @Field(() => String)
  @IsNotEmpty()
  requestId: string;
}

@InputType()
export class UpdateWorkspaceTeammateInput {
  @Field(() => ID)
  @IsNotEmpty()
  id: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  workspaceId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  teammateId?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  role?: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  isOwner?: boolean;

  @Field(() => String)
  @IsNotEmpty()
  requestId: string;
}

// Forward declarations for circular dependencies
// These will be imported when needed to avoid circular dependencies
