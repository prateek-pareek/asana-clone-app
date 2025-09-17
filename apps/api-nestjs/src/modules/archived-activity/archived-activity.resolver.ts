import { Resolver, Query, Args } from '@nestjs/graphql';
import { ArchivedActivityService } from './archived-activity.service';
import { ArchivedActivity, ArchivedActivityWhereInput } from '../../shared/dto/archived-activity.dto';

/**
 * ArchivedActivity resolver for GraphQL operations
 */
@Resolver(() => ArchivedActivity)
export class ArchivedActivityResolver {
  constructor(private readonly archivedActivityService: ArchivedActivityService) {}

  /**
   * Get archived activities by where clause
   */
  @Query(() => [ArchivedActivity])
  async archivedActivities(@Args('where') where: ArchivedActivityWhereInput): Promise<ArchivedActivity[]> {
    return this.archivedActivityService.list(where);
  }
}
