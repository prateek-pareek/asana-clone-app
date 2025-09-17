import { ObjectType, Field, ID, InputType, Int } from '@nestjs/graphql';

/**
 * ProjectLightColor DTO - represents project light colors
 */
@ObjectType()
export class ProjectLightColor {
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
 * ProjectLightColorConnection DTO for pagination
 */
@ObjectType()
export class ProjectLightColorConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [ProjectLightColorEdge])
  edges: ProjectLightColorEdge[];
}

/**
 * ProjectLightColorEdge DTO for pagination
 */
@ObjectType()
export class ProjectLightColorEdge {
  @Field(() => ProjectLightColor, { nullable: true })
  node?: ProjectLightColor;

  @Field(() => String)
  cursor: string;
}

/**
 * CreateProjectLightColorInput DTO
 */
@InputType()
export class CreateProjectLightColorInput {
  @Field(() => ID)
  colorId: string;

  @Field(() => String)
  requestId: string;
}

/**
 * UpdateProjectLightColorInput DTO
 */
@InputType()
export class UpdateProjectLightColorInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID, { nullable: true })
  colorId?: string;

  @Field(() => String)
  requestId: string;
}
