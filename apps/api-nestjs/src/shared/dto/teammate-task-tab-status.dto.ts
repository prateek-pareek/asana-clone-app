import { ObjectType, Field, ID, InputType, Int, registerEnumType } from '@nestjs/graphql';

/**
 * TeammateTaskTabStatusCode enum
 */
export enum TeammateTaskTabStatusCode {
  LIST = 'LIST',
  BOARD = 'BOARD',
  CALENDAR = 'CALENDAR',
  FILES = 'FILES',
}

registerEnumType(TeammateTaskTabStatusCode, {
  name: 'TeammateTaskTabStatusCode',
});

/**
 * TeammateTaskTabStatus DTO - represents teammate task tab status
 */
@ObjectType()
export class TeammateTaskTabStatus {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  workspaceId: string;

  @Field(() => ID)
  teammateId: string;

  @Field(() => TeammateTaskTabStatusCode, { nullable: true })
  statusCode?: TeammateTaskTabStatusCode;

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
 * TeammateTaskTabStatusConnection DTO for pagination
 */
@ObjectType()
export class TeammateTaskTabStatusConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [TeammateTaskTabStatusEdge])
  edges: TeammateTaskTabStatusEdge[];
}

/**
 * TeammateTaskTabStatusEdge DTO for pagination
 */
@ObjectType()
export class TeammateTaskTabStatusEdge {
  @Field(() => TeammateTaskTabStatus, { nullable: true })
  node?: TeammateTaskTabStatus;

  @Field(() => String)
  cursor: string;
}

/**
 * CreateTeammateTaskTabStatusInput DTO
 */
@InputType()
export class CreateTeammateTaskTabStatusInput {
  @Field(() => ID)
  workspaceId: string;

  @Field(() => ID)
  teammateId: string;

  @Field(() => String)
  requestId: string;
}

/**
 * UpdateTeammateTaskTabStatusInput DTO
 */
@InputType()
export class UpdateTeammateTaskTabStatusInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID, { nullable: true })
  workspaceId?: string;

  @Field(() => ID, { nullable: true })
  teammateId?: string;

  @Field(() => TeammateTaskTabStatusCode, { nullable: true })
  statusCode?: TeammateTaskTabStatusCode;

  @Field(() => String)
  requestId: string;
}
