import { ObjectType, Field, ID, InputType, Int } from '@nestjs/graphql';

/**
 * TeammateTaskColumn DTO - represents teammate task columns
 */
@ObjectType()
export class TeammateTaskColumn {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  teammateId: string;

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
  @Field(() => 'Teammate', { nullable: true })
  teammate?: any;

  @Field(() => 'TaskColumn', { nullable: true })
  taskColumn?: any;
}

/**
 * TeammateTaskColumnConnection DTO for pagination
 */
@ObjectType()
export class TeammateTaskColumnConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [TeammateTaskColumnEdge])
  edges: TeammateTaskColumnEdge[];
}

/**
 * TeammateTaskColumnEdge DTO for pagination
 */
@ObjectType()
export class TeammateTaskColumnEdge {
  @Field(() => TeammateTaskColumn, { nullable: true })
  node?: TeammateTaskColumn;

  @Field(() => String)
  cursor: string;
}

/**
 * CreateTeammateTaskColumnInput DTO
 */
@InputType()
export class CreateTeammateTaskColumnInput {
  @Field(() => ID)
  taskColumnId: string;

  @Field(() => ID)
  teammateId: string;

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
 * UpdateTeammateTaskColumnInput DTO
 */
@InputType()
export class UpdateTeammateTaskColumnInput {
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

/**
 * UpdateTeammateTaskColumnOrderInput DTO
 */
@InputType()
export class UpdateTeammateTaskColumnOrderInput {
  @Field(() => [ID])
  ids: string[];
}
