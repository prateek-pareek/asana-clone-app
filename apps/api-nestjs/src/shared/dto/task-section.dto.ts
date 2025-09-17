import { Field, ID, ObjectType, InputType, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

@ObjectType()
export class TaskSection {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}

@ObjectType()
export class TaskSectionConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [TaskSectionEdge])
  edges: TaskSectionEdge[];
}

@ObjectType()
export class TaskSectionEdge {
  @Field(() => TaskSection, { nullable: true })
  node?: TaskSection;

  @Field(() => String)
  cursor: string;
}

@InputType()
export class CreateTaskSectionInput {
  @Field(() => String)
  @IsNotEmpty()
  name: string;

  @Field(() => String)
  @IsNotEmpty()
  requestId: string;
}

@InputType()
export class UpdateTaskSectionInput {
  @Field(() => ID)
  @IsNotEmpty()
  id: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  name?: string;

  @Field(() => String)
  @IsNotEmpty()
  requestId: string;
}
