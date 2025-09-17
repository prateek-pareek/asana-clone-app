import { Field, ID, ObjectType, InputType, Int, registerEnumType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

export enum TaskPriorityType {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

registerEnumType(TaskPriorityType, {
  name: 'TaskPriorityType',
});

@ObjectType()
export class TaskPriority {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => TaskPriorityType)
  priorityType: TaskPriorityType;

  @Field(() => ID)
  colorId: string;

  @Field(() => String)
  color: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}

@ObjectType()
export class TaskPriorityConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [TaskPriorityEdge])
  edges: TaskPriorityEdge[];
}

@ObjectType()
export class TaskPriorityEdge {
  @Field(() => TaskPriority, { nullable: true })
  node?: TaskPriority;

  @Field(() => String)
  cursor: string;
}

@InputType()
export class CreateTaskPriorityInput {
  @Field(() => String)
  @IsNotEmpty()
  name: string;

  @Field(() => TaskPriorityType)
  @IsEnum(TaskPriorityType)
  priorityType: TaskPriorityType;

  @Field(() => ID)
  @IsNotEmpty()
  colorId: string;
}

@InputType()
export class UpdateTaskPriorityInput {
  @Field(() => ID)
  @IsNotEmpty()
  id: string;

  @Field(() => TaskPriorityType, { nullable: true })
  @IsOptional()
  @IsEnum(TaskPriorityType)
  priorityType?: TaskPriorityType;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  colorId?: string;
}

// Forward declaration for circular dependency
// These will be imported when needed to avoid circular dependencies