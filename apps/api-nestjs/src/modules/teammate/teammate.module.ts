import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Teammate, TeammateSchema } from '../../database/schemas/teammate.schema';
import { TeammateService } from './teammate.service';
import { TeammateResolver } from './teammate.resolver';
import { WhereClauseService } from '../../shared/services/where-clause.service';
import { PaginationService } from '../../shared/services/pagination.service';
import { PubSubService } from '../../shared/services/pub-sub.service';
import { GraphQLErrorHandler } from '../../shared/errors/graphql-error-handler';
import { RestErrorHandler } from '../../shared/errors/rest-error-handler';

/**
 * Teammate module for teammate management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: Teammate.name, schema: TeammateSchema }])],
  providers: [TeammateService, TeammateResolver, WhereClauseService, PaginationService, PubSubService, GraphQLErrorHandler, RestErrorHandler],
  exports: [TeammateService],
})
export class TeammateModule {}
