import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskListSortStatus, TaskListSortStatusSchema } from '../../database/schemas/task-list-sort-status.schema';
import { TaskListSortStatusService } from './task-list-sort-status.service';
import { TaskListSortStatusResolver } from './task-list-sort-status.resolver';

/**
 * TaskListSortStatus module for task sorting status management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: TaskListSortStatus.name, schema: TaskListSortStatusSchema }])],
  providers: [TaskListSortStatusService, TaskListSortStatusResolver],
  exports: [TaskListSortStatusService],
})
export class TaskListSortStatusModule {}
