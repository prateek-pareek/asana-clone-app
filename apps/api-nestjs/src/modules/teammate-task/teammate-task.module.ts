import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeammateTask, TeammateTaskSchema } from '../../database/schemas/teammate-task.schema';
import { TeammateTaskService } from './teammate-task.service';
import { TeammateTaskResolver } from './teammate-task.resolver';

/**
 * TeammateTask module for teammate task management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: TeammateTask.name, schema: TeammateTaskSchema }])],
  providers: [TeammateTaskService, TeammateTaskResolver],
  exports: [TeammateTaskService],
})
export class TeammateTaskModule {}
