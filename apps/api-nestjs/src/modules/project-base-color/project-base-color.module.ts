import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectBaseColor, ProjectBaseColorSchema } from '../../database/schemas/project-base-color.schema';
import { ProjectBaseColorService } from './project-base-color.service';
import { ProjectBaseColorResolver } from './project-base-color.resolver';

/**
 * ProjectBaseColor module for project base color management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: ProjectBaseColor.name, schema: ProjectBaseColorSchema }])],
  providers: [ProjectBaseColorService, ProjectBaseColorResolver],
  exports: [ProjectBaseColorService],
})
export class ProjectBaseColorModule {}
