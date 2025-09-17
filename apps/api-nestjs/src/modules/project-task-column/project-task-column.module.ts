import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectTaskColumn, ProjectTaskColumnSchema } from '../../database/schemas/project-task-column.schema';
import { ProjectTaskColumnService } from './project-task-column.service';
import { ProjectTaskColumnResolver } from './project-task-column.resolver';

/**
 * ProjectTaskColumn module for project task column management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: ProjectTaskColumn.name, schema: ProjectTaskColumnSchema }])],
  providers: [ProjectTaskColumnService, ProjectTaskColumnResolver],
  exports: [ProjectTaskColumnService],
})
export class ProjectTaskColumnModule {}
