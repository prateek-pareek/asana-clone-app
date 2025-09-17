import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';

/**
 * ArchivedActivity DTO - represents archived activities
 */
@ObjectType()
export class ArchivedActivity {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  type: string;

  @Field(() => String)
  updatedAt: string;
}

/**
 * ArchivedActivityWhereInput DTO
 */
@InputType()
export class ArchivedActivityWhereInput {
  @Field(() => ID)
  workspaceId: string;
}
