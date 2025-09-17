import { ObjectType, Field, ID, InputType, Int } from '@nestjs/graphql';

/**
 * FavoriteWorkspace DTO - represents favorite workspaces
 */
@ObjectType()
export class FavoriteWorkspace {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  workspaceId: string;

  @Field(() => ID)
  teammateId: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

  // Relations (forward declarations to avoid circular dependencies)
  @Field(() => 'Workspace', { nullable: true })
  workspace?: any;

  @Field(() => 'Teammate', { nullable: true })
  teammate?: any;
}

/**
 * FavoriteWorkspaceConnection DTO for pagination
 */
@ObjectType()
export class FavoriteWorkspaceConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [FavoriteWorkspaceEdge])
  edges: FavoriteWorkspaceEdge[];
}

/**
 * FavoriteWorkspaceEdge DTO for pagination
 */
@ObjectType()
export class FavoriteWorkspaceEdge {
  @Field(() => FavoriteWorkspace, { nullable: true })
  node?: FavoriteWorkspace;

  @Field(() => String)
  cursor: string;
}

/**
 * CreateFavoriteWorkspaceInput DTO
 */
@InputType()
export class CreateFavoriteWorkspaceInput {
  @Field(() => ID)
  workspaceId: string;

  @Field(() => ID)
  teammateId: string;

  @Field(() => String)
  requestId: string;
}

/**
 * DeleteFavoriteWorkspaceInput DTO
 */
@InputType()
export class DeleteFavoriteWorkspaceInput {
  @Field(() => ID)
  workspaceId: string;

  @Field(() => ID)
  teammateId: string;

  @Field(() => String)
  requestId: string;
}
