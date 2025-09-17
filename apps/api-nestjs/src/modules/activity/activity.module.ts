import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Activity, ActivitySchema } from '../../database/schemas/activity.schema';
import { ActivityService } from './activity.service';
import { ActivityResolver } from './activity.resolver';

/**
 * Activity module for activity management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: Activity.name, schema: ActivitySchema }])],
  providers: [ActivityService, ActivityResolver],
  exports: [ActivityService],
})
export class ActivityModule {}
