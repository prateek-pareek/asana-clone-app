import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeletedTask, DeletedTaskSchema } from '../../database/schemas/deleted-task.schema';
import { DeletedTaskService } from './deleted-task.service';
import { DeletedTaskResolver } from './deleted-task.resolver';

/**
 * DeletedTask module for deleted task management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: DeletedTask.name, schema: DeletedTaskSchema }])],
  providers: [DeletedTaskService, DeletedTaskResolver],
  exports: [DeletedTaskService],
})
export class DeletedTaskModule {}
