import { Field, ID, ObjectType, InputType, Int, registerEnumType } from '@nestjs/graphql';
import { IsString, IsNumber, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

export enum TestTodoStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

registerEnumType(TestTodoStatus, {
  name: 'TestTodoStatus',
});

@ObjectType()
export class TestTodo {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => TestTodoStatus)
  status: TestTodoStatus;

  @Field(() => Int)
  priority: number;

  @Field(() => ID, { nullable: true })
  testUserID?: string;

  @Field(() => ID)
  parentToDoId: string;

  @Field(() => [String])
  children: string[];

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

  @Field(() => String)
  dueDate: string;
}

@ObjectType()
export class TestTodoConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [TestTodoEdge])
  edges: TestTodoEdge[];
}

@ObjectType()
export class TestTodoEdge {
  @Field(() => TestTodo, { nullable: true })
  node?: TestTodo;

  @Field(() => String)
  cursor: string;
}

@InputType()
export class CreateTestTodoInput {
  @Field(() => String)
  @IsNotEmpty()
  name: string;

  @Field(() => TestTodoStatus, { defaultValue: TestTodoStatus.IN_PROGRESS })
  @IsEnum(TestTodoStatus)
  status: TestTodoStatus;

  @Field(() => Int)
  @IsNumber()
  priority: number;

  @Field(() => ID)
  @IsNotEmpty()
  testUserID: string;
}

@InputType()
export class UpdateTestTodoInput {
  @Field(() => ID)
  @IsNotEmpty()
  id: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  name?: string;

  @Field(() => TestTodoStatus, { nullable: true })
  @IsOptional()
  @IsEnum(TestTodoStatus)
  status?: TestTodoStatus;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  priority?: number;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  testUserID?: string;
}
