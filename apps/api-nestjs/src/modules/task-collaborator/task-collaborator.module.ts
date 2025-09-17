import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskCollaborator, TaskCollaboratorSchema } from '../../database/schemas/task-collaborator.schema';
import { TaskCollaboratorService } from './task-collaborator.service';
import { TaskCollaboratorResolver } from './task-collaborator.resolver';

/**
 * TaskCollaborator module for task collaborator management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: TaskCollaborator.name, schema: TaskCollaboratorSchema }])],
  providers: [TaskCollaboratorService, TaskCollaboratorResolver],
  exports: [TaskCollaboratorService],
})
export class TaskCollaboratorModule {}
