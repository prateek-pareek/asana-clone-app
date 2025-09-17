import { Field, ID, ObjectType, InputType, Int } from '@nestjs/graphql';
import { IsString, IsNumber, IsNotEmpty, IsOptional, IsObject } from 'class-validator';

@ObjectType()
export class TestUserProfile {
  @Field(() => String, { nullable: true })
  address?: string;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => TestUserProfileBody, { nullable: true })
  body?: TestUserProfileBody;
}

@ObjectType()
export class TestUserProfileBody {
  @Field(() => Int, { nullable: true })
  weight?: number;

  @Field(() => Int, { nullable: true })
  height?: number;

  @Field(() => TestUserProfileBodyComment, { nullable: true })
  comment?: TestUserProfileBodyComment;
}

@ObjectType()
export class TestUserProfileBodyComment {
  @Field(() => String, { nullable: true })
  type?: string;

  @Field(() => String, { nullable: true })
  text?: string;
}

@InputType()
export class TestUserProfileInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  address?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  phone?: string;

  @Field(() => TestUserProfileBodyInput, { nullable: true })
  @IsOptional()
  body?: TestUserProfileBodyInput;
}

@InputType()
export class TestUserProfileBodyInput {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  weight?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  height?: number;

  @Field(() => TestUserProfileBodyCommentInput, { nullable: true })
  @IsOptional()
  comment?: TestUserProfileBodyCommentInput;
}

@InputType()
export class TestUserProfileBodyCommentInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  type?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  text?: string;
}

@ObjectType()
export class TestUser {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  age: number;

  @Field(() => [String])
  testTodos: string[];

  @Field(() => TestUserProfile)
  profile: TestUserProfile;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}

@ObjectType()
export class TestUserConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [TestUserEdge])
  edges: TestUserEdge[];
}

@ObjectType()
export class TestUserEdge {
  @Field(() => TestUser, { nullable: true })
  node?: TestUser;

  @Field(() => String)
  cursor: string;
}

@InputType()
export class CreateTestUserInput {
  @Field(() => String)
  @IsNotEmpty()
  name: string;

  @Field(() => Int)
  @IsNumber()
  age: number;

  @Field(() => TestUserProfileInput)
  @IsObject()
  profile: TestUserProfileInput;

  @Field(() => String, { nullable: true })
  @IsOptional()
  description?: string;
}

@InputType()
export class UpdateTestUserInput {
  @Field(() => ID)
  @IsNotEmpty()
  id: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  name?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  age?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  description?: string;
}

// Forward declaration for circular dependency
// These will be imported when needed to avoid circular dependencies
