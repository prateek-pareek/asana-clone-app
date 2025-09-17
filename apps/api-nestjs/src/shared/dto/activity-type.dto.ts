import { Field, ID, ObjectType, InputType, Int, registerEnumType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

export enum ActivityTypeCode {
  TASK = 'TASK',
  WORKSPACE = 'WORKSPACE',
}

registerEnumType(ActivityTypeCode, {
  name: 'ActivityTypeCode',
});

@ObjectType()
export class ActivityType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => ActivityTypeCode)
  typeCode: ActivityTypeCode;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}

@ObjectType()
export class ActivityTypeConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [ActivityTypeEdge])
  edges: ActivityTypeEdge[];
}

@ObjectType()
export class ActivityTypeEdge {
  @Field(() => ActivityType, { nullable: true })
  node?: ActivityType;

  @Field(() => String)
  cursor: string;
}

@InputType()
export class CreateActivityTypeInput {
  @Field(() => String)
  @IsNotEmpty()
  name: string;

  @Field(() => ActivityTypeCode)
  @IsEnum(ActivityTypeCode)
  typeCode: ActivityTypeCode;
}

@InputType()
export class UpdateActivityTypeInput {
  @Field(() => ID)
  @IsNotEmpty()
  id: string;

  @Field(() => ActivityTypeCode, { nullable: true })
  @IsOptional()
  @IsEnum(ActivityTypeCode)
  typeCode?: ActivityTypeCode;
}
