import { ObjectType, Field, ID, InputType, Int } from '@nestjs/graphql';

/**
 * ProjectTaskColumn DTO - represents project task columns
 */
@ObjectType()
export class ProjectTaskColumn {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  projectId: string;

  @Field(() => ID)
  taskColumnId: string;

  @Field(() => String)
  width: string;

  @Field(() => Boolean)
  disabled: boolean;

  @Field(() => Boolean)
  customizable: boolean;

  @Field(() => Int)
  order: number;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

  // Relations (forward declarations to avoid circular dependencies)
  @Field(() => 'Project', { nullable: true })
  project?: any;

  @Field(() => 'TaskColumn', { nullable: true })
  taskColumn?: any;
}

/**
 * ProjectTaskColumnConnection DTO for pagination
 */
@ObjectType()
export class ProjectTaskColumnConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [ProjectTaskColumnEdge])
  edges: ProjectTaskColumnEdge[];
}

/**
 * ProjectTaskColumnEdge DTO for pagination
 */
@ObjectType()
export class ProjectTaskColumnEdge {
  @Field(() => ProjectTaskColumn, { nullable: true })
  node?: ProjectTaskColumn;

  @Field(() => String)
  cursor: string;
}

/**
 * CreateProjectTaskColumnInput DTO
 */
@InputType()
export class CreateProjectTaskColumnInput {
  @Field(() => ID)
  taskColumnId: string;

  @Field(() => ID)
  projectId: string;

  @Field(() => String)
  width: string;

  @Field(() => Boolean)
  disabled: boolean;

  @Field(() => Boolean)
  customizable: boolean;

  @Field(() => Int)
  order: number;

  @Field(() => String)
  requestId: string;
}

/**
 * UpdateProjectTaskColumnInput DTO
 */
@InputType()
export class UpdateProjectTaskColumnInput {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  width?: string;

  @Field(() => Boolean, { nullable: true })
  disabled?: boolean;

  @Field(() => Boolean, { nullable: true })
  customizable?: boolean;

  @Field(() => Int, { nullable: true })
  order?: number;

  @Field(() => String)
  requestId: string;
}
