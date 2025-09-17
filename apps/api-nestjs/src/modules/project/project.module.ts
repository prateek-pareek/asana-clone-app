import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from '../../database/schemas/project.schema';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { WhereClauseService } from '../../shared/services/where-clause.service';
import { PaginationService } from '../../shared/services/pagination.service';
import { PubSubService } from '../../shared/services/pub-sub.service';
import { GraphQLErrorHandler } from '../../shared/errors/graphql-error-handler';
import { RestErrorHandler } from '../../shared/errors/rest-error-handler';

/**
 * Project module for project management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }])],
  providers: [ProjectService, ProjectResolver, WhereClauseService, PaginationService, PubSubService, GraphQLErrorHandler, RestErrorHandler],
  exports: [ProjectService],
})
export class ProjectModule {}
