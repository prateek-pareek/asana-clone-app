import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskActivityTask, TaskActivityTaskSchema } from '../../database/schemas/task-activity-task.schema';
import { TaskActivityTaskService } from './task-activity-task.service';
import { TaskActivityTaskResolver } from './task-activity-task.resolver';

/**
 * TaskActivityTask module for task activity task management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: TaskActivityTask.name, schema: TaskActivityTaskSchema }])],
  providers: [TaskActivityTaskService, TaskActivityTaskResolver],
  exports: [TaskActivityTaskService],
})
export class TaskActivityTaskModule {}
