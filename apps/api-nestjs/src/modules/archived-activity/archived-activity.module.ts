import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArchivedActivity, ArchivedActivitySchema } from '../../database/schemas/archived-activity.schema';
import { ArchivedActivityService } from './archived-activity.service';
import { ArchivedActivityResolver } from './archived-activity.resolver';

/**
 * ArchivedActivity module for archived activity management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: ArchivedActivity.name, schema: ArchivedActivitySchema }])],
  providers: [ArchivedActivityService, ArchivedActivityResolver],
  exports: [ArchivedActivityService],
})
export class ArchivedActivityModule {}
