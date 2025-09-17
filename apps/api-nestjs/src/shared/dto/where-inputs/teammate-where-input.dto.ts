import { InputType, Field, ID } from '@nestjs/graphql';

/**
 * TeammateWhereInput DTO - matches Go TeammateWhereInput structure
 */
@InputType()
export class TeammateWhereInput {
  @Field(() => TeammateWhereInput, { nullable: true })
  not?: TeammateWhereInput;

  @Field(() => [TeammateWhereInput], { nullable: true })
  or?: TeammateWhereInput[];

  @Field(() => [TeammateWhereInput], { nullable: true })
  and?: TeammateWhereInput[];

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

  // Email field predicates
  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  emailNEQ?: string;

  @Field(() => [String], { nullable: true })
  emailIn?: string[];

  @Field(() => [String], { nullable: true })
  emailNotIn?: string[];

  @Field(() => String, { nullable: true })
  emailGT?: string;

  @Field(() => String, { nullable: true })
  emailGTE?: string;

  @Field(() => String, { nullable: true })
  emailLT?: string;

  @Field(() => String, { nullable: true })
  emailLTE?: string;

  @Field(() => String, { nullable: true })
  emailContains?: string;

  @Field(() => String, { nullable: true })
  emailHasPrefix?: string;

  @Field(() => String, { nullable: true })
  emailHasSuffix?: string;

  @Field(() => String, { nullable: true })
  emailEqualFold?: string;

  @Field(() => String, { nullable: true })
  emailContainsFold?: string;

  // Avatar field predicates
  @Field(() => String, { nullable: true })
  avatar?: string;

  @Field(() => String, { nullable: true })
  avatarNEQ?: string;

  @Field(() => [String], { nullable: true })
  avatarIn?: string[];

  @Field(() => [String], { nullable: true })
  avatarNotIn?: string[];

  @Field(() => String, { nullable: true })
  avatarGT?: string;

  @Field(() => String, { nullable: true })
  avatarGTE?: string;

  @Field(() => String, { nullable: true })
  avatarLT?: string;

  @Field(() => String, { nullable: true })
  avatarLTE?: string;

  @Field(() => String, { nullable: true })
  avatarContains?: string;

  @Field(() => String, { nullable: true })
  avatarHasPrefix?: string;

  @Field(() => String, { nullable: true })
  avatarHasSuffix?: string;

  @Field(() => String, { nullable: true })
  avatarEqualFold?: string;

  @Field(() => String, { nullable: true })
  avatarContainsFold?: string;

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
  hasProjectTeammates?: boolean;

  @Field(() => Boolean, { nullable: true })
  hasTaskCollaborators?: boolean;

  @Field(() => Boolean, { nullable: true })
  hasTeammateTasks?: boolean;

  @Field(() => Boolean, { nullable: true })
  hasTeammateTaskSections?: boolean;

  @Field(() => Boolean, { nullable: true })
  hasTeammateTaskColumns?: boolean;

  @Field(() => Boolean, { nullable: true })
  hasTeammateTaskListStatuses?: boolean;

  @Field(() => Boolean, { nullable: true })
  hasTeammateTaskTabStatuses?: boolean;
}
