import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Me, MeSchema } from './schemas/me.schema';
import { Task, TaskSchema } from './schemas/task.schema';
import { Workspace, WorkspaceSchema } from './schemas/workspace.schema';
import { Project, ProjectSchema } from './schemas/project.schema';
import { Color, ColorSchema } from './schemas/color.schema';
import { Tag, TagSchema } from './schemas/tag.schema';
import { Teammate, TeammateSchema } from './schemas/teammate.schema';
import { FileType, FileTypeSchema } from './schemas/file-type.schema';
import { Icon, IconSchema } from './schemas/icon.schema';
import { Mention, MentionSchema } from './schemas/mention.schema';
import { Activity, ActivitySchema } from './schemas/activity.schema';
import { TaskFeed, TaskFeedSchema } from './schemas/task-feed.schema';
import { TaskFeedLike, TaskFeedLikeSchema } from './schemas/task-feed-like.schema';
import { TaskFile, TaskFileSchema } from './schemas/task-file.schema';
import { TaskPriority, TaskPrioritySchema } from './schemas/task-priority.schema';
import { TaskSection, TaskSectionSchema } from './schemas/task-section.schema';
import { TaskColumn, TaskColumnSchema } from './schemas/task-column.schema';
import { TaskLike, TaskLikeSchema } from './schemas/task-like.schema';
import { TaskCollaborator, TaskCollaboratorSchema } from './schemas/task-collaborator.schema';
import { TaskTag, TaskTagSchema } from './schemas/task-tag.schema';
import { WorkspaceTeammate, WorkspaceTeammateSchema } from './schemas/workspace-teammate.schema';
import { ProjectTeammate, ProjectTeammateSchema } from './schemas/project-teammate.schema';
import { ActivityType, ActivityTypeSchema } from './schemas/activity-type.schema';
import { TestUser, TestUserSchema } from './schemas/test-user.schema';
import { TestTodo, TestTodoSchema } from './schemas/test-todo.schema';
import { ProjectTask, ProjectTaskSchema } from './schemas/project-task.schema';
import { ProjectTaskSection, ProjectTaskSectionSchema } from './schemas/project-task-section.schema';
import { TeammateTask, TeammateTaskSchema } from './schemas/teammate-task.schema';
import { TeammateTaskSection, TeammateTaskSectionSchema } from './schemas/teammate-task-section.schema';
import { TaskListCompletedStatus, TaskListCompletedStatusSchema } from './schemas/task-list-completed-status.schema';
import { TaskListSortStatus, TaskListSortStatusSchema } from './schemas/task-list-sort-status.schema';
import { TaskActivity, TaskActivitySchema } from './schemas/task-activity.schema';
import { WorkspaceActivity, WorkspaceActivitySchema } from './schemas/workspace-activity.schema';
import { DeletedTask, DeletedTaskSchema } from './schemas/deleted-task.schema';
import { ArchivedActivity, ArchivedActivitySchema } from './schemas/archived-activity.schema';
import { FavoriteProject, FavoriteProjectSchema } from './schemas/favorite-project.schema';
import { FavoriteWorkspace, FavoriteWorkspaceSchema } from './schemas/favorite-workspace.schema';
import { ArchivedTaskActivity, ArchivedTaskActivitySchema } from './schemas/archived-task-activity.schema';
import { ProjectBaseColor, ProjectBaseColorSchema } from './schemas/project-base-color.schema';
import { ArchivedTaskActivityTask, ArchivedTaskActivityTaskSchema } from './schemas/archived-task-activity-task.schema';
import { ProjectIcon, ProjectIconSchema } from './schemas/project-icon.schema';
import { ProjectLightColor, ProjectLightColorSchema } from './schemas/project-light-color.schema';
import { ProjectTaskColumn, ProjectTaskColumnSchema } from './schemas/project-task-column.schema';
import { ProjectTaskListStatus, ProjectTaskListStatusSchema } from './schemas/project-task-list-status.schema';
import { TaskActivityTask, TaskActivityTaskSchema } from './schemas/task-activity-task.schema';
import { TeammateTaskColumn, TeammateTaskColumnSchema } from './schemas/teammate-task-column.schema';
import { TeammateTaskListStatus, TeammateTaskListStatusSchema } from './schemas/teammate-task-list-status.schema';
import { TeammateTaskTabStatus, TeammateTaskTabStatusSchema } from './schemas/teammate-task-tab-status.schema';
import { ArchivedWorkspaceActivity, ArchivedWorkspaceActivitySchema } from './schemas/archived-workspace-activity.schema';
import { WorkspaceActivityTask, WorkspaceActivityTaskSchema } from './schemas/workspace-activity-task.schema';

/**
 * Database module that provides all MongoDB schemas
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Me.name, schema: MeSchema },
      { name: Task.name, schema: TaskSchema },
      { name: Workspace.name, schema: WorkspaceSchema },
      { name: Project.name, schema: ProjectSchema },
      { name: Color.name, schema: ColorSchema },
      { name: Tag.name, schema: TagSchema },
      { name: Teammate.name, schema: TeammateSchema },
      { name: FileType.name, schema: FileTypeSchema },
      { name: Icon.name, schema: IconSchema },
      { name: Mention.name, schema: MentionSchema },
      { name: Activity.name, schema: ActivitySchema },
      { name: TaskFeed.name, schema: TaskFeedSchema },
      { name: TaskFeedLike.name, schema: TaskFeedLikeSchema },
      { name: TaskFile.name, schema: TaskFileSchema },
      { name: TaskPriority.name, schema: TaskPrioritySchema },
      { name: TaskSection.name, schema: TaskSectionSchema },
      { name: TaskColumn.name, schema: TaskColumnSchema },
      { name: TaskLike.name, schema: TaskLikeSchema },
      { name: TaskCollaborator.name, schema: TaskCollaboratorSchema },
      { name: TaskTag.name, schema: TaskTagSchema },
      { name: WorkspaceTeammate.name, schema: WorkspaceTeammateSchema },
      { name: ProjectTeammate.name, schema: ProjectTeammateSchema },
      { name: ActivityType.name, schema: ActivityTypeSchema },
      { name: TestUser.name, schema: TestUserSchema },
      { name: TestTodo.name, schema: TestTodoSchema },
      { name: ProjectTask.name, schema: ProjectTaskSchema },
      { name: ProjectTaskSection.name, schema: ProjectTaskSectionSchema },
      { name: TeammateTask.name, schema: TeammateTaskSchema },
      { name: TeammateTaskSection.name, schema: TeammateTaskSectionSchema },
      { name: TaskListCompletedStatus.name, schema: TaskListCompletedStatusSchema },
      { name: TaskListSortStatus.name, schema: TaskListSortStatusSchema },
      { name: TaskActivity.name, schema: TaskActivitySchema },
      { name: WorkspaceActivity.name, schema: WorkspaceActivitySchema },
      { name: DeletedTask.name, schema: DeletedTaskSchema },
      { name: ArchivedActivity.name, schema: ArchivedActivitySchema },
      { name: FavoriteProject.name, schema: FavoriteProjectSchema },
      { name: FavoriteWorkspace.name, schema: FavoriteWorkspaceSchema },
      { name: ArchivedTaskActivity.name, schema: ArchivedTaskActivitySchema },
      { name: ProjectBaseColor.name, schema: ProjectBaseColorSchema },
      { name: ArchivedTaskActivityTask.name, schema: ArchivedTaskActivityTaskSchema },
      { name: ProjectIcon.name, schema: ProjectIconSchema },
      { name: ProjectLightColor.name, schema: ProjectLightColorSchema },
      { name: ProjectTaskColumn.name, schema: ProjectTaskColumnSchema },
      { name: ProjectTaskListStatus.name, schema: ProjectTaskListStatusSchema },
      { name: TaskActivityTask.name, schema: TaskActivityTaskSchema },
      { name: TeammateTaskColumn.name, schema: TeammateTaskColumnSchema },
      { name: TeammateTaskListStatus.name, schema: TeammateTaskListStatusSchema },
      { name: TeammateTaskTabStatus.name, schema: TeammateTaskTabStatusSchema },
      { name: ArchivedWorkspaceActivity.name, schema: ArchivedWorkspaceActivitySchema },
      { name: WorkspaceActivityTask.name, schema: WorkspaceActivityTaskSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
