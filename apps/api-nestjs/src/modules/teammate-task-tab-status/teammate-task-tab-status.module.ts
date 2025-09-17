import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeammateTaskTabStatus, TeammateTaskTabStatusSchema } from '../../database/schemas/teammate-task-tab-status.schema';
import { TeammateTaskTabStatusService } from './teammate-task-tab-status.service';
import { TeammateTaskTabStatusResolver } from './teammate-task-tab-status.resolver';

/**
 * TeammateTaskTabStatus module for teammate task tab status management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: TeammateTaskTabStatus.name, schema: TeammateTaskTabStatusSchema }])],
  providers: [TeammateTaskTabStatusService, TeammateTaskTabStatusResolver],
  exports: [TeammateTaskTabStatusService],
})
export class TeammateTaskTabStatusModule {}
