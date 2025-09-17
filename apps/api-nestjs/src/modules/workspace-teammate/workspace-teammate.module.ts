import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkspaceTeammate, WorkspaceTeammateSchema } from '../../database/schemas/workspace-teammate.schema';
import { WorkspaceTeammateService } from './workspace-teammate.service';
import { WorkspaceTeammateResolver } from './workspace-teammate.resolver';

/**
 * WorkspaceTeammate module for workspace teammate management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: WorkspaceTeammate.name, schema: WorkspaceTeammateSchema }])],
  providers: [WorkspaceTeammateService, WorkspaceTeammateResolver],
  exports: [WorkspaceTeammateService],
})
export class WorkspaceTeammateModule {}
