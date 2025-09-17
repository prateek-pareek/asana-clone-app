import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Workspace, WorkspaceSchema } from '../../database/schemas/workspace.schema';
import { WorkspaceService } from './workspace.service';
import { WorkspaceResolver } from './workspace.resolver';

/**
 * Workspace module for workspace management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: Workspace.name, schema: WorkspaceSchema }])],
  providers: [WorkspaceService, WorkspaceResolver],
  exports: [WorkspaceService],
})
export class WorkspaceModule {}