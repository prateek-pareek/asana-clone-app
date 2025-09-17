import { ObjectType, Field, ID, InputType, Int, Boolean } from '@nestjs/graphql';
import { IsString, IsOptional, IsBoolean, IsArray, IsInt } from 'class-validator';
import { Node, Connection, Edge, Cursor, Map, Time } from '../types/common.types';
import { TaskPriority } from './task-priority.dto';
import { TaskFile } from './task-file.dto';
import { TaskFeed } from './task-feed.dto';
import { TaskFeedLike } from './task-feed-like.dto';
import { TaskLike } from './task-like.dto';
import { TaskCollaborator } from './task-collaborator.dto';
import { TaskTag } from './task-tag.dto';
import { ProjectTask } from './project-task.dto';

/**
 * Task entity matching Go model exactly
 */
@ObjectType({ implements: Node })
export class Task implements Node {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Map)
  description: Map;

  @Field(() => ID)
  taskParentId: string;

  @Field(() => ID)
  taskPriorityId: string;

  @Field(() => TaskPriority, { nullable: true })
  taskPriority?: TaskPriority;

  @Field(() => ID)
  assigneeId: string;

  @Field(() => ID)
  createdBy: string;

  @Field(() => Boolean)
  completed: boolean;

  @Field()
  completedAt: string;

  @Field(() => Boolean)
  isNew: boolean;

  @Field()
  dueDate: string;

  @Field()
  dueTime: string;

  @Field(() => [Task])
  subTasks: Task[];

  @Field(() => Task, { nullable: true })
  parentTask?: Task;

  @Field(() => [TaskFile])
  taskFiles: TaskFile[];

  @Field(() => [TaskFeed])
  taskFeeds: TaskFeed[];

  @Field(() => [TaskFeedLike])
  taskFeedLikes: TaskFeedLike[];

  @Field(() => [TaskLike])
  taskLikes: TaskLike[];

  @Field(() => [TaskCollaborator])
  taskCollaborators: TaskCollaborator[];

  @Field(() => [TaskTag])
  taskTags: TaskTag[];

  @Field(() => [ProjectTask])
  projectTasks: ProjectTask[];

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}

/**
 * TaskConnection matching Go model exactly
 */
@ObjectType()
export class TaskConnection implements Connection<Task> {
  @Field(() => Int)
  totalCount: number;

  @Field(() => PageInfo)
  pageInfo: PageInfo;

  @Field(() => [TaskEdge])
  edges: TaskEdge[];
}

/**
 * TaskEdge matching Go model exactly
 */
@ObjectType()
export class TaskEdge implements Edge<Task> {
  @Field(() => Task, { nullable: true })
  node?: Task;

  @Field(() => Cursor)
  cursor: Cursor;
}

/**
 * CreateTaskInput matching Go model exactly
 */
@InputType()
export class CreateTaskInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field(() => Map, { nullable: true })
  @IsOptional()
  description?: Map;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  isNew?: boolean;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsString()
  taskParentId?: string;

  @Field(() => ID)
  @IsString()
  createdBy: string;

  @Field()
  @IsString()
  requestId: string;

  @Field(() => ID)
  @IsString()
  workspaceId: string;
}

/**
 * UpdateTaskInput matching Go model exactly
 */
@InputType()
export class UpdateTaskInput {
  @Field(() => ID)
  @IsString()
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field(() => Map, { nullable: true })
  @IsOptional()
  description?: Map;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsString()
  taskParentId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsString()
  taskPriorityId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsString()
  assigneeId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsString()
  createdBy?: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @Field(() => Time, { nullable: true })
  @IsOptional()
  completedAt?: Time;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  isNew?: boolean;

  @Field(() => Time, { nullable: true })
  @IsOptional()
  dueDate?: Time;

  @Field(() => Time, { nullable: true })
  @IsOptional()
  dueTime?: Time;

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  addSubTaskIDs?: string[];

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  clearCompletedAt?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  clearDueDate?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  clearDueTime?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  clearTaskPriority?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  clearParentTask?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  clearTeammate?: boolean;

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  removeSubTaskIDs?: string[];

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  addTeammateTaskIDs?: string[];

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  removeTeammateTaskIDs?: string[];

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  addProjectTaskIDs?: string[];

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  removeProjectTaskIDs?: string[];

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  addTaskLikeIDs?: string[];

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  removeTaskLikeIDs?: string[];

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  addTaskTagIDs?: string[];

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  removeTaskTagIDs?: string[];

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  addTaskCollaboratorIDs?: string[];

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  removeTaskCollaboratorIDs?: string[];

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  addTaskFeedIDs?: string[];

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  removeTaskFeedIDs?: string[];

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  addTaskFeedLikeIDs?: string[];

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  removeTaskFeedLikeIDs?: string[];

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  addTaskFileIDs?: string[];

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  removeTaskFileIDs?: string[];

  @Field()
  @IsString()
  requestId: string;

  @Field(() => ID)
  @IsString()
  workspaceId: string;
}

/**
 * DeleteTaskInput matching Go model exactly
 */
@InputType()
export class DeleteTaskInput {
  @Field(() => ID)
  @IsString()
  taskId: string;

  @Field(() => ID)
  @IsString()
  workspaceId: string;

  @Field()
  @IsString()
  requestId: string;
}

/**
 * DeleteTaskPayload matching Go model exactly
 */
@ObjectType()
export class DeleteTaskPayload {
  @Field(() => TeammateTask)
  teammateTask: TeammateTask;

  @Field(() => [ProjectTask])
  projectTasks: ProjectTask[];

  @Field(() => DeletedTask)
  deletedTask: DeletedTask;
}

/**
 * UndeleteTaskInput matching Go model exactly
 */
@InputType()
export class UndeleteTaskInput {
  @Field(() => ID)
  @IsString()
  taskId: string;

  @Field(() => ID)
  @IsString()
  workspaceId: string;

  @Field()
  @IsString()
  requestId: string;
}

/**
 * UndeleteTaskPayload matching Go model exactly
 */
@ObjectType()
export class UndeleteTaskPayload {
  @Field(() => TeammateTask)
  teammateTask: TeammateTask;

  @Field(() => [ProjectTask])
  projectTasks: ProjectTask[];

  @Field(() => DeletedTask)
  deletedTask: DeletedTask;
}

/**
 * DeleteAllTaskInput matching Go model exactly
 */
@InputType()
export class DeleteAllTaskInput {
  @Field(() => [ID])
  @IsArray()
  taskIds: string[];

  @Field(() => ID)
  @IsString()
  workspaceId: string;

  @Field()
  @IsString()
  requestId: string;
}

/**
 * DeleteAllTaskPayload matching Go model exactly
 */
@ObjectType()
export class DeleteAllTaskPayload {
  @Field(() => [TeammateTask])
  teammateTasks: TeammateTask[];

  @Field(() => [ProjectTask])
  projectTasks: ProjectTask[];

  @Field(() => [DeletedTask])
  deletedTasks: DeletedTask[];
}

/**
 * UndeleteAllTaskInput matching Go model exactly
 */
@InputType()
export class UndeleteAllTaskInput {
  @Field(() => [ID])
  @IsArray()
  taskIds: string[];

  @Field(() => ID)
  @IsString()
  workspaceId: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsString()
  teammateTaskSectionId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsString()
  projectTaskSectionId?: string;

  @Field()
  @IsString()
  requestId: string;
}

/**
 * UndeleteAllTaskPayload matching Go model exactly
 */
@ObjectType()
export class UndeleteAllTaskPayload {
  @Field(() => [TeammateTask])
  teammateTasks: TeammateTask[];

  @Field(() => [ProjectTask])
  projectTasks: ProjectTask[];

  @Field(() => [DeletedTask])
  deletedTasks: DeletedTask[];
}

/**
 * AssignTaskInput matching Go model exactly
 */
@InputType()
export class AssignTaskInput {
  @Field(() => ID)
  @IsString()
  id: string;

  @Field(() => ID)
  @IsString()
  assigneeId: string;

  @Field(() => ID)
  @IsString()
  workspaceId: string;

  @Field()
  @IsString()
  requestId: string;
}

/**
 * AssignTaskPayload matching Go model exactly
 */
@ObjectType()
export class AssignTaskPayload {
  @Field(() => Task)
  task: Task;

  @Field(() => TeammateTask)
  teammateTask: TeammateTask;
}

/**
 * UnassignTaskInput matching Go model exactly
 */
@InputType()
export class UnassignTaskInput {
  @Field(() => ID)
  @IsString()
  id: string;

  @Field(() => ID)
  @IsString()
  workspaceId: string;

  @Field()
  @IsString()
  requestId: string;
}

/**
 * UnassignTaskPayload matching Go model exactly
 */
@ObjectType()
export class UnassignTaskPayload {
  @Field(() => Task)
  task: Task;

  @Field(() => ID)
  teammateTaskId: string;
}

// Import types that are referenced but not yet defined
import { TeammateTask } from './teammate-task.dto';
import { DeletedTask } from './deleted-task.dto';
import { PageInfo } from '../types/common.types';
