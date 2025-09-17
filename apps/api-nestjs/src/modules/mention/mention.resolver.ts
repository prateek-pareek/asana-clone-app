import { Resolver, Query, Args } from '@nestjs/graphql';
import { MentionService } from './mention.service';
import { Mention } from '../../shared/dto/mention.dto';

/**
 * Mention resolver for GraphQL operations
 * Note: Mention only has a query, no mutations or subscriptions
 */
@Resolver(() => Mention)
export class MentionResolver {
  constructor(private readonly mentionService: MentionService) {}

  /**
   * Get mentions by where clause (special signature different from other entities)
   */
  @Query(() => [Mention])
  async mentions(@Args('where') where: any): Promise<Mention[]> {
    return this.mentionService.list(where);
  }
}
