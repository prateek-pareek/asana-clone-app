import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArchivedTaskActivityTask, ArchivedTaskActivityTaskSchema } from '../../database/schemas/archived-task-activity-task.schema';
import { ArchivedTaskActivityTaskService } from './archived-task-activity-task.service';
import { ArchivedTaskActivityTaskResolver } from './archived-task-activity-task.resolver';

/**
 * ArchivedTaskActivityTask module for archived task activity task management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: ArchivedTaskActivityTask.name, schema: ArchivedTaskActivityTaskSchema }])],
  providers: [ArchivedTaskActivityTaskService, ArchivedTaskActivityTaskResolver],
  exports: [ArchivedTaskActivityTaskService],
})
export class ArchivedTaskActivityTaskModule {}
