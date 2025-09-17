import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkspaceActivityTask, WorkspaceActivityTaskSchema } from '../../database/schemas/workspace-activity-task.schema';
import { WorkspaceActivityTaskService } from './workspace-activity-task.service';
import { WorkspaceActivityTaskResolver } from './workspace-activity-task.resolver';

/**
 * WorkspaceActivityTask module for workspace activity task management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: WorkspaceActivityTask.name, schema: WorkspaceActivityTaskSchema }])],
  providers: [WorkspaceActivityTaskService, WorkspaceActivityTaskResolver],
  exports: [WorkspaceActivityTaskService],
})
export class WorkspaceActivityTaskModule {}
