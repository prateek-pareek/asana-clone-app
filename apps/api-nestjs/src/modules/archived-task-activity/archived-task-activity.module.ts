import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArchivedTaskActivity, ArchivedTaskActivitySchema } from '../../database/schemas/archived-task-activity.schema';
import { ArchivedTaskActivityService } from './archived-task-activity.service';
import { ArchivedTaskActivityResolver } from './archived-task-activity.resolver';

/**
 * ArchivedTaskActivity module for archived task activity management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: ArchivedTaskActivity.name, schema: ArchivedTaskActivitySchema }])],
  providers: [ArchivedTaskActivityService, ArchivedTaskActivityResolver],
  exports: [ArchivedTaskActivityService],
})
export class ArchivedTaskActivityModule {}
