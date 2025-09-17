import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkspaceActivity, WorkspaceActivitySchema } from '../../database/schemas/workspace-activity.schema';
import { WorkspaceActivityService } from './workspace-activity.service';
import { WorkspaceActivityResolver } from './workspace-activity.resolver';

/**
 * WorkspaceActivity module for workspace activity management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: WorkspaceActivity.name, schema: WorkspaceActivitySchema }])],
  providers: [WorkspaceActivityService, WorkspaceActivityResolver],
  exports: [WorkspaceActivityService],
})
export class WorkspaceActivityModule {}
