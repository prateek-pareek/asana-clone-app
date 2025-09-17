import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskColumn, TaskColumnSchema } from '../../database/schemas/task-column.schema';
import { TaskColumnService } from './task-column.service';
import { TaskColumnResolver } from './task-column.resolver';

/**
 * TaskColumn module for task column management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: TaskColumn.name, schema: TaskColumnSchema }])],
  providers: [TaskColumnService, TaskColumnResolver],
  exports: [TaskColumnService],
})
export class TaskColumnModule {}
