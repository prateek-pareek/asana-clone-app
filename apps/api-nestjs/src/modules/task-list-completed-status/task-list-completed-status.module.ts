import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskListCompletedStatus, TaskListCompletedStatusSchema } from '../../database/schemas/task-list-completed-status.schema';
import { TaskListCompletedStatusService } from './task-list-completed-status.service';
import { TaskListCompletedStatusResolver } from './task-list-completed-status.resolver';

/**
 * TaskListCompletedStatus module for task completion status management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: TaskListCompletedStatus.name, schema: TaskListCompletedStatusSchema }])],
  providers: [TaskListCompletedStatusService, TaskListCompletedStatusResolver],
  exports: [TaskListCompletedStatusService],
})
export class TaskListCompletedStatusModule {}
