import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskLike, TaskLikeSchema } from '../../database/schemas/task-like.schema';
import { TaskLikeService } from './task-like.service';
import { TaskLikeResolver } from './task-like.resolver';

/**
 * TaskLike module for task like management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: TaskLike.name, schema: TaskLikeSchema }])],
  providers: [TaskLikeService, TaskLikeResolver],
  exports: [TaskLikeService],
})
export class TaskLikeModule {}
