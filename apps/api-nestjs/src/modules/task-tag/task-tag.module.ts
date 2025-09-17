import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskTag, TaskTagSchema } from '../../database/schemas/task-tag.schema';
import { TaskTagService } from './task-tag.service';
import { TaskTagResolver } from './task-tag.resolver';

/**
 * TaskTag module for task tag management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: TaskTag.name, schema: TaskTagSchema }])],
  providers: [TaskTagService, TaskTagResolver],
  exports: [TaskTagService],
})
export class TaskTagModule {}
