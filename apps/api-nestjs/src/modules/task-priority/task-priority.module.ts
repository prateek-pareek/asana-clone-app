import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskPriority, TaskPrioritySchema } from '../../database/schemas/task-priority.schema';
import { TaskPriorityService } from './task-priority.service';
import { TaskPriorityResolver } from './task-priority.resolver';

/**
 * TaskPriority module for task priority management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: TaskPriority.name, schema: TaskPrioritySchema }])],
  providers: [TaskPriorityService, TaskPriorityResolver],
  exports: [TaskPriorityService],
})
export class TaskPriorityModule {}
