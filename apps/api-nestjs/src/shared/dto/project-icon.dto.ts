import { ObjectType, Field, ID, InputType, Int } from '@nestjs/graphql';

/**
 * ProjectIcon DTO - represents project icons
 */
@ObjectType()
export class ProjectIcon {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

  // Relations (forward declarations to avoid circular dependencies)
  @Field(() => 'Icon', { nullable: true })
  icon?: any;
}

/**
 * ProjectIconConnection DTO for pagination
 */
@ObjectType()
export class ProjectIconConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [ProjectIconEdge])
  edges: ProjectIconEdge[];
}

/**
 * ProjectIconEdge DTO for pagination
 */
@ObjectType()
export class ProjectIconEdge {
  @Field(() => ProjectIcon, { nullable: true })
  node?: ProjectIcon;

  @Field(() => String)
  cursor: string;
}

/**
 * CreateProjectIconInput DTO
 */
@InputType()
export class CreateProjectIconInput {
  @Field(() => ID)
  iconId: string;

  @Field(() => String)
  requestId: string;
}

/**
 * UpdateProjectIconInput DTO
 */
@InputType()
export class UpdateProjectIconInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID, { nullable: true })
  iconId?: string;

  @Field(() => String)
  requestId: string;
}
