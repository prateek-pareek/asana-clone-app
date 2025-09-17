import { InputType, Field, ID } from '@nestjs/graphql';

/**
 * WorkspaceWhereInput DTO - matches Go WorkspaceWhereInput structure
 */
@InputType()
export class WorkspaceWhereInput {
  @Field(() => WorkspaceWhereInput, { nullable: true })
  not?: WorkspaceWhereInput;

  @Field(() => [WorkspaceWhereInput], { nullable: true })
  or?: WorkspaceWhereInput[];

  @Field(() => [WorkspaceWhereInput], { nullable: true })
  and?: WorkspaceWhereInput[];

  // ID field predicates
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field(() => ID, { nullable: true })
  idNEQ?: string;

  @Field(() => [ID], { nullable: true })
  idIn?: string[];

  @Field(() => [ID], { nullable: true })
  idNotIn?: string[];

  @Field(() => ID, { nullable: true })
  idGT?: string;

  @Field(() => ID, { nullable: true })
  idGTE?: string;

  @Field(() => ID, { nullable: true })
  idLT?: string;

  @Field(() => ID, { nullable: true })
  idLTE?: string;

  // Name field predicates
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  nameNEQ?: string;

  @Field(() => [String], { nullable: true })
  nameIn?: string[];

  @Field(() => [String], { nullable: true })
  nameNotIn?: string[];

  @Field(() => String, { nullable: true })
  nameGT?: string;

  @Field(() => String, { nullable: true })
  nameGTE?: string;

  @Field(() => String, { nullable: true })
  nameLT?: string;

  @Field(() => String, { nullable: true })
  nameLTE?: string;

  @Field(() => String, { nullable: true })
  nameContains?: string;

  @Field(() => String, { nullable: true })
  nameHasPrefix?: string;

  @Field(() => String, { nullable: true })
  nameHasSuffix?: string;

  @Field(() => String, { nullable: true })
  nameEqualFold?: string;

  @Field(() => String, { nullable: true })
  nameContainsFold?: string;

  // Description field predicates
  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  descriptionNEQ?: string;

  @Field(() => [String], { nullable: true })
  descriptionIn?: string[];

  @Field(() => [String], { nullable: true })
  descriptionNotIn?: string[];

  @Field(() => String, { nullable: true })
  descriptionGT?: string;

  @Field(() => String, { nullable: true })
  descriptionGTE?: string;

  @Field(() => String, { nullable: true })
  descriptionLT?: string;

  @Field(() => String, { nullable: true })
  descriptionLTE?: string;

  @Field(() => String, { nullable: true })
  descriptionContains?: string;

  @Field(() => String, { nullable: true })
  descriptionHasPrefix?: string;

  @Field(() => String, { nullable: true })
  descriptionHasSuffix?: string;

  @Field(() => String, { nullable: true })
  descriptionEqualFold?: string;

  @Field(() => String, { nullable: true })
  descriptionContainsFold?: string;

  // Created at field predicates
  @Field(() => String, { nullable: true })
  createdAt?: string;

  @Field(() => String, { nullable: true })
  createdAtNEQ?: string;

  @Field(() => [String], { nullable: true })
  createdAtIn?: string[];

  @Field(() => [String], { nullable: true })
  createdAtNotIn?: string[];

  @Field(() => String, { nullable: true })
  createdAtGT?: string;

  @Field(() => String, { nullable: true })
  createdAtGTE?: string;

  @Field(() => String, { nullable: true })
  createdAtLT?: string;

  @Field(() => String, { nullable: true })
  createdAtLTE?: string;

  // Updated at field predicates
  @Field(() => String, { nullable: true })
  updatedAt?: string;

  @Field(() => String, { nullable: true })
  updatedAtNEQ?: string;

  @Field(() => [String], { nullable: true })
  updatedAtIn?: string[];

  @Field(() => [String], { nullable: true })
  updatedAtNotIn?: string[];

  @Field(() => String, { nullable: true })
  updatedAtGT?: string;

  @Field(() => String, { nullable: true })
  updatedAtGTE?: string;

  @Field(() => String, { nullable: true })
  updatedAtLT?: string;

  @Field(() => String, { nullable: true })
  updatedAtLTE?: string;

  // Edge predicates (simplified for now)
  @Field(() => Boolean, { nullable: true })
  hasWorkspaceTeammates?: boolean;

  @Field(() => Boolean, { nullable: true })
  hasProjects?: boolean;

  @Field(() => Boolean, { nullable: true })
  hasWorkspaceActivities?: boolean;

  @Field(() => Boolean, { nullable: true })
  hasFavoriteWorkspaces?: boolean;
}
