import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from '../../database/schemas/task.schema';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';
import { WhereClauseService } from '../../shared/services/where-clause.service';
import { PaginationService } from '../../shared/services/pagination.service';
import { PubSubService } from '../../shared/services/pub-sub.service';
import { GraphQLErrorHandler } from '../../shared/errors/graphql-error-handler';
import { RestErrorHandler } from '../../shared/errors/rest-error-handler';

/**
 * Task module for task management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }])],
  providers: [TaskService, TaskResolver, WhereClauseService, PaginationService, PubSubService, GraphQLErrorHandler, RestErrorHandler],
  exports: [TaskService],
})
export class TaskModule {}
