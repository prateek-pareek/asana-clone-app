import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskFile, TaskFileSchema } from '../../database/schemas/task-file.schema';
import { TaskFileService } from './task-file.service';
import { TaskFileResolver } from './task-file.resolver';

/**
 * TaskFile module for task file management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: TaskFile.name, schema: TaskFileSchema }])],
  providers: [TaskFileService, TaskFileResolver],
  exports: [TaskFileService],
})
export class TaskFileModule {}
