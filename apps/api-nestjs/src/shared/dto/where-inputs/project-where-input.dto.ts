import { InputType, Field, ID } from '@nestjs/graphql';

/**
 * ProjectWhereInput DTO - matches Go ProjectWhereInput structure
 */
@InputType()
export class ProjectWhereInput {
  @Field(() => ProjectWhereInput, { nullable: true })
  not?: ProjectWhereInput;

  @Field(() => [ProjectWhereInput], { nullable: true })
  or?: ProjectWhereInput[];

  @Field(() => [ProjectWhereInput], { nullable: true })
  and?: ProjectWhereInput[];

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

  // Workspace ID field predicates
  @Field(() => ID, { nullable: true })
  workspaceId?: string;

  @Field(() => ID, { nullable: true })
  workspaceIdNEQ?: string;

  @Field(() => [ID], { nullable: true })
  workspaceIdIn?: string[];

  @Field(() => [ID], { nullable: true })
  workspaceIdNotIn?: string[];

  @Field(() => ID, { nullable: true })
  workspaceIdGT?: string;

  @Field(() => ID, { nullable: true })
  workspaceIdGTE?: string;

  @Field(() => ID, { nullable: true })
  workspaceIdLT?: string;

  @Field(() => ID, { nullable: true })
  workspaceIdLTE?: string;

  @Field(() => Boolean, { nullable: true })
  workspaceIdIsNil?: boolean;

  @Field(() => Boolean, { nullable: true })
  workspaceIdNotNil?: boolean;

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

  // Color field predicates
  @Field(() => String, { nullable: true })
  color?: string;

  @Field(() => String, { nullable: true })
  colorNEQ?: string;

  @Field(() => [String], { nullable: true })
  colorIn?: string[];

  @Field(() => [String], { nullable: true })
  colorNotIn?: string[];

  @Field(() => String, { nullable: true })
  colorGT?: string;

  @Field(() => String, { nullable: true })
  colorGTE?: string;

  @Field(() => String, { nullable: true })
  colorLT?: string;

  @Field(() => String, { nullable: true })
  colorLTE?: string;

  @Field(() => String, { nullable: true })
  colorContains?: string;

  @Field(() => String, { nullable: true })
  colorHasPrefix?: string;

  @Field(() => String, { nullable: true })
  colorHasSuffix?: string;

  @Field(() => String, { nullable: true })
  colorEqualFold?: string;

  @Field(() => String, { nullable: true })
  colorContainsFold?: string;

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
  hasWorkspace?: boolean;

  @Field(() => Boolean, { nullable: true })
  hasProjectTasks?: boolean;

  @Field(() => Boolean, { nullable: true })
  hasProjectTeammates?: boolean;

  @Field(() => Boolean, { nullable: true })
  hasProjectTaskSections?: boolean;

  @Field(() => Boolean, { nullable: true })
  hasProjectTaskColumns?: boolean;

  @Field(() => Boolean, { nullable: true })
  hasProjectTaskListStatuses?: boolean;

  @Field(() => Boolean, { nullable: true })
  hasProjectBaseColors?: boolean;

  @Field(() => Boolean, { nullable: true })
  hasProjectIcons?: boolean;

  @Field(() => Boolean, { nullable: true })
  hasProjectLightColors?: boolean;

  @Field(() => Boolean, { nullable: true })
  hasFavoriteProjects?: boolean;
}
