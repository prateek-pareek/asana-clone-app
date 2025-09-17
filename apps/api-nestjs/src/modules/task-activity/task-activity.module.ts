import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskActivity, TaskActivitySchema } from '../../database/schemas/task-activity.schema';
import { TaskActivityService } from './task-activity.service';
import { TaskActivityResolver } from './task-activity.resolver';

/**
 * TaskActivity module for task activity management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: TaskActivity.name, schema: TaskActivitySchema }])],
  providers: [TaskActivityService, TaskActivityResolver],
  exports: [TaskActivityService],
})
export class TaskActivityModule {}
