import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeammateTaskSection, TeammateTaskSectionSchema } from '../../database/schemas/teammate-task-section.schema';
import { TeammateTaskSectionService } from './teammate-task-section.service';
import { TeammateTaskSectionResolver } from './teammate-task-section.resolver';

/**
 * TeammateTaskSection module for teammate task section management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: TeammateTaskSection.name, schema: TeammateTaskSectionSchema }])],
  providers: [TeammateTaskSectionService, TeammateTaskSectionResolver],
  exports: [TeammateTaskSectionService],
})
export class TeammateTaskSectionModule {}
