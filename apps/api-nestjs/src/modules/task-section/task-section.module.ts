import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSection, TaskSectionSchema } from '../../database/schemas/task-section.schema';
import { TaskSectionService } from './task-section.service';
import { TaskSectionResolver } from './task-section.resolver';

/**
 * TaskSection module for task section management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: TaskSection.name, schema: TaskSectionSchema }])],
  providers: [TaskSectionService, TaskSectionResolver],
  exports: [TaskSectionService],
})
export class TaskSectionModule {}
