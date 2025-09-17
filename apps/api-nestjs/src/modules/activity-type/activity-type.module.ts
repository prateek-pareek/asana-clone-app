import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivityType, ActivityTypeSchema } from '../../database/schemas/activity-type.schema';
import { ActivityTypeService } from './activity-type.service';
import { ActivityTypeResolver } from './activity-type.resolver';

/**
 * ActivityType module for activity type management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: ActivityType.name, schema: ActivityTypeSchema }])],
  providers: [ActivityTypeService, ActivityTypeResolver],
  exports: [ActivityTypeService],
})
export class ActivityTypeModule {}
