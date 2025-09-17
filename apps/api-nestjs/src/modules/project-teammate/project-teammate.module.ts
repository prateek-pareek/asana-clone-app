import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectTeammate, ProjectTeammateSchema } from '../../database/schemas/project-teammate.schema';
import { ProjectTeammateService } from './project-teammate.service';
import { ProjectTeammateResolver } from './project-teammate.resolver';

/**
 * ProjectTeammate module for project teammate management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: ProjectTeammate.name, schema: ProjectTeammateSchema }])],
  providers: [ProjectTeammateService, ProjectTeammateResolver],
  exports: [ProjectTeammateService],
})
export class ProjectTeammateModule {}
