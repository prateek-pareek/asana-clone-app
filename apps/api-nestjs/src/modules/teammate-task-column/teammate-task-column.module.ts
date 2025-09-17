import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeammateTaskColumn, TeammateTaskColumnSchema } from '../../database/schemas/teammate-task-column.schema';
import { TeammateTaskColumnService } from './teammate-task-column.service';
import { TeammateTaskColumnResolver } from './teammate-task-column.resolver';

/**
 * TeammateTaskColumn module for teammate task column management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: TeammateTaskColumn.name, schema: TeammateTaskColumnSchema }])],
  providers: [TeammateTaskColumnService, TeammateTaskColumnResolver],
  exports: [TeammateTaskColumnService],
})
export class TeammateTaskColumnModule {}
