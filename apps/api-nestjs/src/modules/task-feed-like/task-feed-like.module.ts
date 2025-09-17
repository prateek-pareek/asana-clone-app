import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskFeedLike, TaskFeedLikeSchema } from '../../database/schemas/task-feed-like.schema';
import { TaskFeedLikeService } from './task-feed-like.service';
import { TaskFeedLikeResolver } from './task-feed-like.resolver';

/**
 * TaskFeedLike module for task feed like management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: TaskFeedLike.name, schema: TaskFeedLikeSchema }])],
  providers: [TaskFeedLikeService, TaskFeedLikeResolver],
  exports: [TaskFeedLikeService],
})
export class TaskFeedLikeModule {}
