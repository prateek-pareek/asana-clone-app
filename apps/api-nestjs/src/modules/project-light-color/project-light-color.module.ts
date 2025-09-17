import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectLightColor, ProjectLightColorSchema } from '../../database/schemas/project-light-color.schema';
import { ProjectLightColorService } from './project-light-color.service';
import { ProjectLightColorResolver } from './project-light-color.resolver';

/**
 * ProjectLightColor module for project light color management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: ProjectLightColor.name, schema: ProjectLightColorSchema }])],
  providers: [ProjectLightColorService, ProjectLightColorResolver],
  exports: [ProjectLightColorService],
})
export class ProjectLightColorModule {}
