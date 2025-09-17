import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskFeed, TaskFeedSchema } from '../../database/schemas/task-feed.schema';
import { TaskFeedService } from './task-feed.service';
import { TaskFeedResolver } from './task-feed.resolver';

/**
 * TaskFeed module for task feed management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: TaskFeed.name, schema: TaskFeedSchema }])],
  providers: [TaskFeedService, TaskFeedResolver],
  exports: [TaskFeedService],
})
export class TaskFeedModule {}
