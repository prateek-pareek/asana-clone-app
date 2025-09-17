import { InputType, Field, ID } from '@nestjs/graphql';

/**
 * TaskWhereInput DTO - matches Go TaskWhereInput structure
 */
@InputType()
export class TaskWhereInput {
  @Field(() => TaskWhereInput, { nullable: true })
  not?: TaskWhereInput;

  @Field(() => [TaskWhereInput], { nullable: true })
  or?: TaskWhereInput[];

  @Field(() => [TaskWhereInput], { nullable: true })
  and?: TaskWhereInput[];

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

  // Task parent ID field predicates
  @Field(() => ID, { nullable: true })
  taskParentID?: string;

  @Field(() => ID, { nullable: true })
  taskParentIDNEQ?: string;

  @Field(() => [ID], { nullable: true })
  taskParentIDIn?: string[];

  @Field(() => [ID], { nullable: true })
  taskParentIDNotIn?: string[];

  @Field(() => ID, { nullable: true })
  taskParentIDGT?: string;

  @Field(() => ID, { nullable: true })
  taskParentIDGTE?: string;

  @Field(() => ID, { nullable: true })
  taskParentIDLT?: string;

  @Field(() => ID, { nullable: true })
  taskParentIDLTE?: string;

  @Field(() => Boolean, { nullable: true })
  taskParentIDIsNil?: boolean;

  @Field(() => Boolean, { nullable: true })
  taskParentIDNotNil?: boolean;

  // Task priority ID field predicates
  @Field(() => ID, { nullable: true })
  taskPriorityID?: string;

  @Field(() => ID, { nullable: true })
  taskPriorityIDNEQ?: string;

  @Field(() => [ID], { nullable: true })
  taskPriorityIDIn?: string[];

  @Field(() => [ID], { nullable: true })
  taskPriorityIDNotIn?: string[];

  @Field(() => ID, { nullable: true })
  taskPriorityIDGT?: string;

  @Field(() => ID, { nullable: true })
  taskPriorityIDGTE?: string;

  @Field(() => ID, { nullable: true })
  taskPriorityIDLT?: string;

  @Field(() => ID, { nullable: true })
  taskPriorityIDLTE?: string;

  @Field(() => Boolean, { nullable: true })
  taskPriorityIDIsNil?: boolean;

  @Field(() => Boolean, { nullable: true })
  taskPriorityIDNotNil?: boolean;

  // Assignee ID field predicates
  @Field(() => ID, { nullable: true })
  assigneeId?: string;

  @Field(() => ID, { nullable: true })
  assigneeIdNEQ?: string;

  @Field(() => [ID], { nullable: true })
  assigneeIdIn?: string[];

  @Field(() => [ID], { nullable: true })
  assigneeIdNotIn?: string[];

  @Field(() => ID, { nullable: true })
  assigneeIdGT?: string;

  @Field(() => ID, { nullable: true })
  assigneeIdGTE?: string;

  @Field(() => ID, { nullable: true })
  assigneeIdLT?: string;

  @Field(() => ID, { nullable: true })
  assigneeIdLTE?: string;

  @Field(() => Boolean, { nullable: true })
  assigneeIdIsNil?: boolean;

  @Field(() => Boolean, { nullable: true })
  assigneeIdNotNil?: boolean;

  // Created by field predicates
  @Field(() => ID, { nullable: true })
  createdBy?: string;

  @Field(() => ID, { nullable: true })
  createdByNEQ?: string;

  @Field(() => [ID], { nullable: true })
  createdByIn?: string[];

  @Field(() => [ID], { nullable: true })
  createdByNotIn?: string[];

  @Field(() => ID, { nullable: true })
  createdByGT?: string;

  @Field(() => ID, { nullable: true })
  createdByGTE?: string;

  @Field(() => ID, { nullable: true })
  createdByLT?: string;

  @Field(() => ID, { nullable: true })
  createdByLTE?: string;

  @Field(() => Boolean, { nullable: true })
  createdByIsNil?: boolean;

  @Field(() => Boolean, { nullable: true })
  createdByNotNil?: boolean;

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

  // Completed field predicates
  @Field(() => Boolean, { nullable: true })
  completed?: boolean;

  @Field(() => Boolean, { nullable: true })
  completedNEQ?: boolean;

  // IsNew field predicates
  @Field(() => Boolean, { nullable: true })
  isNew?: boolean;

  @Field(() => Boolean, { nullable: true })
  isNewNEQ?: boolean;

  // Due date field predicates
  @Field(() => String, { nullable: true })
  dueDate?: string;

  @Field(() => String, { nullable: true })
  dueDateNEQ?: string;

  @Field(() => [String], { nullable: true })
  dueDateIn?: string[];

  @Field(() => [String], { nullable: true })
  dueDateNotIn?: string[];

  @Field(() => String, { nullable: true })
  dueDateGT?: string;

  @Field(() => String, { nullable: true })
  dueDateGTE?: string;

  @Field(() => String, { nullable: true })
  dueDateLT?: string;

  @Field(() => String, { nullable: true })
  dueDateLTE?: string;

  @Field(() => Boolean, { nullable: true })
  dueDateIsNil?: boolean;

  @Field(() => Boolean, { nullable: true })
  dueDateNotNil?: boolean;

  // Due time field predicates
  @Field(() => String, { nullable: true })
  dueTime?: string;

  @Field(() => String, { nullable: true })
  dueTimeNEQ?: string;

  @Field(() => [String], { nullable: true })
  dueTimeIn?: string[];

  @Field(() => [String], { nullable: true })
  dueTimeNotIn?: string[];

  @Field(() => String, { nullable: true })
  dueTimeGT?: string;

  @Field(() => String, { nullable: true })
  dueTimeGTE?: string;

  @Field(() => String, { nullable: true })
  dueTimeLT?: string;

  @Field(() => String, { nullable: true })
  dueTimeLTE?: string;

  @Field(() => Boolean, { nullable: true })
  dueTimeIsNil?: boolean;

  @Field(() => Boolean, { nullable: true })
  dueTimeNotNil?: boolean;

  // Completed at field predicates
  @Field(() => String, { nullable: true })
  completedAt?: string;

  @Field(() => String, { nullable: true })
  completedAtNEQ?: string;

  @Field(() => [String], { nullable: true })
  completedAtIn?: string[];

  @Field(() => [String], { nullable: true })
  completedAtNotIn?: string[];

  @Field(() => String, { nullable: true })
  completedAtGT?: string;

  @Field(() => String, { nullable: true })
  completedAtGTE?: string;

  @Field(() => String, { nullable: true })
  completedAtLT?: string;

  @Field(() => String, { nullable: true })
  completedAtLTE?: string;

  @Field(() => Boolean, { nullable: true })
  completedAtIsNil?: boolean;

  @Field(() => Boolean, { nullable: true })
  completedAtNotNil?: boolean;

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
  hasTeammate?: boolean;

  @Field(() => Boolean, { nullable: true })
  hasTaskPriority?: boolean;

  @Field(() => Boolean, { nullable: true })
  hasSubTasks?: boolean;

  @Field(() => Boolean, { nullable: true })
  hasParentTask?: boolean;

  @Field(() => Boolean, { nullable: true })
  hasTeammateTasks?: boolean;

  @Field(() => Boolean, { nullable: true })
  hasProjectTasks?: boolean;

  @Field(() => Boolean, { nullable: true })
  hasTaskLikes?: boolean;

  @Field(() => Boolean, { nullable: true })
  hasTaskTags?: boolean;

  @Field(() => Boolean, { nullable: true })
  hasTaskCollaborators?: boolean;

  @Field(() => Boolean, { nullable: true })
  hasTaskFeeds?: boolean;

  @Field(() => Boolean, { nullable: true })
  hasTaskFeedLikes?: boolean;

  @Field(() => Boolean, { nullable: true })
  hasTaskFiles?: boolean;
}
