import { ObjectType, Field, ID, InputType, Int } from '@nestjs/graphql';

/**
 * FavoriteProject DTO - represents favorite projects
 */
@ObjectType()
export class FavoriteProject {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  projectId: string;

  @Field(() => ID)
  teammateId: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

  // Relations (forward declarations to avoid circular dependencies)
  @Field(() => 'Project', { nullable: true })
  project?: any;

  @Field(() => 'Teammate', { nullable: true })
  teammate?: any;
}

/**
 * FavoriteProjectConnection DTO for pagination
 */
@ObjectType()
export class FavoriteProjectConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [FavoriteProjectEdge])
  edges: FavoriteProjectEdge[];
}

/**
 * FavoriteProjectEdge DTO for pagination
 */
@ObjectType()
export class FavoriteProjectEdge {
  @Field(() => FavoriteProject, { nullable: true })
  node?: FavoriteProject;

  @Field(() => String)
  cursor: string;
}

/**
 * CreateFavoriteProjectInput DTO
 */
@InputType()
export class CreateFavoriteProjectInput {
  @Field(() => ID)
  projectId: string;

  @Field(() => ID)
  teammateId: string;

  @Field(() => String)
  requestId: string;
}

/**
 * DeleteFavoriteProjectInput DTO
 */
@InputType()
export class DeleteFavoriteProjectInput {
  @Field(() => ID)
  projectId: string;

  @Field(() => ID)
  teammateId: string;

  @Field(() => String)
  requestId: string;
}
