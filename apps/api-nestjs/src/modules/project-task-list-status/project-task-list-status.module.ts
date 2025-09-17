import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectTaskListStatus, ProjectTaskListStatusSchema } from '../../database/schemas/project-task-list-status.schema';
import { ProjectTaskListStatusService } from './project-task-list-status.service';
import { ProjectTaskListStatusResolver } from './project-task-list-status.resolver';

/**
 * ProjectTaskListStatus module for project task list status management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: ProjectTaskListStatus.name, schema: ProjectTaskListStatusSchema }])],
  providers: [ProjectTaskListStatusService, ProjectTaskListStatusResolver],
  exports: [ProjectTaskListStatusService],
})
export class ProjectTaskListStatusModule {}
