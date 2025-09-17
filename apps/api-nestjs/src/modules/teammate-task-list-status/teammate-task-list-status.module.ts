import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeammateTaskListStatus, TeammateTaskListStatusSchema } from '../../database/schemas/teammate-task-list-status.schema';
import { TeammateTaskListStatusService } from './teammate-task-list-status.service';
import { TeammateTaskListStatusResolver } from './teammate-task-list-status.resolver';

/**
 * TeammateTaskListStatus module for teammate task list status management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: TeammateTaskListStatus.name, schema: TeammateTaskListStatusSchema }])],
  providers: [TeammateTaskListStatusService, TeammateTaskListStatusResolver],
  exports: [TeammateTaskListStatusService],
})
export class TeammateTaskListStatusModule {}
