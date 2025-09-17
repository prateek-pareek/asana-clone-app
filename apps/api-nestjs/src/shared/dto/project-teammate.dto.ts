import { Field, ID, ObjectType, InputType, Int } from '@nestjs/graphql';
import { IsString, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

@ObjectType()
export class ProjectTeammate {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  projectId: string;

  @Field(() => String)
  project: string;

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
export class ProjectTeammateConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [ProjectTeammateEdge])
  edges: ProjectTeammateEdge[];
}

@ObjectType()
export class ProjectTeammateEdge {
  @Field(() => ProjectTeammate, { nullable: true })
  node?: ProjectTeammate;

  @Field(() => String)
  cursor: string;
}

@InputType()
export class CreateProjectTeammateInput {
  @Field(() => ID)
  @IsNotEmpty()
  projectId: string;

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
export class UpdateProjectTeammateInput {
  @Field(() => ID)
  @IsNotEmpty()
  id: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  projectId?: string;

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

  @Field(() => ID)
  @IsNotEmpty()
  workspaceId: string;
}

@InputType()
export class UpdateProjectTeammateOwnerInput {
  @Field(() => ID)
  @IsNotEmpty()
  teammateId: string;

  @Field(() => ID)
  @IsNotEmpty()
  projectId: string;

  @Field(() => String)
  @IsNotEmpty()
  requestId: string;

  @Field(() => ID)
  @IsNotEmpty()
  workspaceId: string;
}

// Forward declarations for circular dependencies
// These will be imported when needed to avoid circular dependencies
