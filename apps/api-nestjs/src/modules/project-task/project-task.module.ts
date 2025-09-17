import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectTask, ProjectTaskSchema } from '../../database/schemas/project-task.schema';
import { ProjectTaskService } from './project-task.service';
import { ProjectTaskResolver } from './project-task.resolver';

/**
 * ProjectTask module for project task management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: ProjectTask.name, schema: ProjectTaskSchema }])],
  providers: [ProjectTaskService, ProjectTaskResolver],
  exports: [ProjectTaskService],
})
export class ProjectTaskModule {}
