import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectIcon, ProjectIconSchema } from '../../database/schemas/project-icon.schema';
import { ProjectIconService } from './project-icon.service';
import { ProjectIconResolver } from './project-icon.resolver';

/**
 * ProjectIcon module for project icon management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: ProjectIcon.name, schema: ProjectIconSchema }])],
  providers: [ProjectIconService, ProjectIconResolver],
  exports: [ProjectIconService],
})
export class ProjectIconModule {}
