import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArchivedWorkspaceActivity, ArchivedWorkspaceActivitySchema } from '../../database/schemas/archived-workspace-activity.schema';
import { ArchivedWorkspaceActivityService } from './archived-workspace-activity.service';
import { ArchivedWorkspaceActivityResolver } from './archived-workspace-activity.resolver';

/**
 * ArchivedWorkspaceActivity module for archived workspace activity management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: ArchivedWorkspaceActivity.name, schema: ArchivedWorkspaceActivitySchema }])],
  providers: [ArchivedWorkspaceActivityService, ArchivedWorkspaceActivityResolver],
  exports: [ArchivedWorkspaceActivityService],
})
export class ArchivedWorkspaceActivityModule {}
