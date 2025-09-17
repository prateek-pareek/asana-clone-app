import { ObjectType, Field, ID, InputType, Int } from '@nestjs/graphql';

/**
 * ProjectBaseColor DTO - represents project base colors
 */
@ObjectType()
export class ProjectBaseColor {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

  // Relations (forward declarations to avoid circular dependencies)
  @Field(() => 'Color', { nullable: true })
  color?: any;
}

/**
 * ProjectBaseColorConnection DTO for pagination
 */
@ObjectType()
export class ProjectBaseColorConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [ProjectBaseColorEdge])
  edges: ProjectBaseColorEdge[];
}

/**
 * ProjectBaseColorEdge DTO for pagination
 */
@ObjectType()
export class ProjectBaseColorEdge {
  @Field(() => ProjectBaseColor, { nullable: true })
  node?: ProjectBaseColor;

  @Field(() => String)
  cursor: string;
}

/**
 * CreateProjectBaseColorInput DTO
 */
@InputType()
export class CreateProjectBaseColorInput {
  @Field(() => ID)
  colorId: string;

  @Field(() => String)
  requestId: string;
}

/**
 * UpdateProjectBaseColorInput DTO
 */
@InputType()
export class UpdateProjectBaseColorInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID, { nullable: true })
  colorId?: string;

  @Field(() => String)
  requestId: string;
}
