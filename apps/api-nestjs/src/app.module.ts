import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

// Core modules
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { MeModule } from './modules/me/me.module';
import { WorkspaceModule } from './modules/workspace/workspace.module';
import { ProjectModule } from './modules/project/project.module';
import { TaskModule } from './modules/task/task.module';
import { ColorModule } from './modules/color/color.module';
import { TagModule } from './modules/tag/tag.module';
import { TeammateModule } from './modules/teammate/teammate.module';
import { FileTypeModule } from './modules/file-type/file-type.module';
import { IconModule } from './modules/icon/icon.module';
import { MentionModule } from './modules/mention/mention.module';
import { ActivityModule } from './modules/activity/activity.module';
import { TaskFeedModule } from './modules/task-feed/task-feed.module';
import { TaskFeedLikeModule } from './modules/task-feed-like/task-feed-like.module';
import { TaskFileModule } from './modules/task-file/task-file.module';
import { TaskPriorityModule } from './modules/task-priority/task-priority.module';
import { TaskSectionModule } from './modules/task-section/task-section.module';
import { TaskColumnModule } from './modules/task-column/task-column.module';
import { TaskLikeModule } from './modules/task-like/task-like.module';
import { TaskCollaboratorModule } from './modules/task-collaborator/task-collaborator.module';
import { TaskTagModule } from './modules/task-tag/task-tag.module';
import { WorkspaceTeammateModule } from './modules/workspace-teammate/workspace-teammate.module';
import { ProjectTeammateModule } from './modules/project-teammate/project-teammate.module';
import { ActivityTypeModule } from './modules/activity-type/activity-type.module';
import { TestUserModule } from './modules/test-user/test-user.module';
import { TestTodoModule } from './modules/test-todo/test-todo.module';
import { ProjectTaskModule } from './modules/project-task/project-task.module';
import { ProjectTaskSectionModule } from './modules/project-task-section/project-task-section.module';
import { TeammateTaskModule } from './modules/teammate-task/teammate-task.module';
import { TaskListCompletedStatusModule } from './modules/task-list-completed-status/task-list-completed-status.module';
import { TeammateTaskSectionModule } from './modules/teammate-task-section/teammate-task-section.module';
import { TaskListSortStatusModule } from './modules/task-list-sort-status/task-list-sort-status.module';
import { TaskActivityModule } from './modules/task-activity/task-activity.module';
import { WorkspaceActivityModule } from './modules/workspace-activity/workspace-activity.module';
import { DeletedTaskModule } from './modules/deleted-task/deleted-task.module';
import { ArchivedActivityModule } from './modules/archived-activity/archived-activity.module';
import { FavoriteProjectModule } from './modules/favorite-project/favorite-project.module';
import { FavoriteWorkspaceModule } from './modules/favorite-workspace/favorite-workspace.module';
import { ArchivedTaskActivityModule } from './modules/archived-task-activity/archived-task-activity.module';
import { ProjectBaseColorModule } from './modules/project-base-color/project-base-color.module';
import { ArchivedTaskActivityTaskModule } from './modules/archived-task-activity-task/archived-task-activity-task.module';
import { ProjectIconModule } from './modules/project-icon/project-icon.module';
import { ProjectLightColorModule } from './modules/project-light-color/project-light-color.module';
import { ProjectTaskColumnModule } from './modules/project-task-column/project-task-column.module';
import { ProjectTaskListStatusModule } from './modules/project-task-list-status/project-task-list-status.module';
import { TaskActivityTaskModule } from './modules/task-activity-task/task-activity-task.module';
import { TeammateTaskColumnModule } from './modules/teammate-task-column/teammate-task-column.module';
import { TeammateTaskListStatusModule } from './modules/teammate-task-list-status/teammate-task-list-status.module';
import { TeammateTaskTabStatusModule } from './modules/teammate-task-tab-status/teammate-task-tab-status.module';
import { ArchivedWorkspaceActivityModule } from './modules/archived-workspace-activity/archived-workspace-activity.module';
import { WorkspaceActivityTaskModule } from './modules/workspace-activity-task/workspace-activity-task.module';
import { DatabaseController } from './modules/database/database.controller';

// Configuration
import { databaseConfig } from './config/database.config';
import { appConfig } from './config/app.config';

/**
 * Main application module that orchestrates all feature modules
 */
@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
      envFilePath: ['.env.local', '.env'],
    }),

    // Database
    MongooseModule.forRootAsync({
      useFactory: (configService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject: ['ConfigService'],
    }),

    // GraphQL
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      introspection: true,
      context: ({ req }) => ({ req }),
    }),

    // Database module
    DatabaseModule,

    // Feature modules
    AuthModule,
    MeModule,
    WorkspaceModule,
    ProjectModule,
    TaskModule,
    ColorModule,
    TagModule,
    TeammateModule,
    FileTypeModule,
    IconModule,
    MentionModule,
    ActivityModule,
    TaskFeedModule,
    TaskFeedLikeModule,
    TaskFileModule,
    TaskPriorityModule,
    TaskSectionModule,
    TaskColumnModule,
    TaskLikeModule,
    TaskCollaboratorModule,
    TaskTagModule,
    WorkspaceTeammateModule,
    ProjectTeammateModule,
    ActivityTypeModule,
    TestUserModule,
    TestTodoModule,
    ProjectTaskModule,
    ProjectTaskSectionModule,
    TeammateTaskModule,
    TaskListCompletedStatusModule,
    TeammateTaskSectionModule,
    TaskListSortStatusModule,
    TaskActivityModule,
    WorkspaceActivityModule,
    DeletedTaskModule,
    ArchivedActivityModule,
    FavoriteProjectModule,
    FavoriteWorkspaceModule,
    ArchivedTaskActivityModule,
    ProjectBaseColorModule,
    ArchivedTaskActivityTaskModule,
    ProjectIconModule,
    ProjectLightColorModule,
    ProjectTaskColumnModule,
    ProjectTaskListStatusModule,
    TaskActivityTaskModule,
    TeammateTaskColumnModule,
    TeammateTaskListStatusModule,
    TeammateTaskTabStatusModule,
    ArchivedWorkspaceActivityModule,
    WorkspaceActivityTaskModule,
  ],
  controllers: [DatabaseController],
})
export class AppModule {}
