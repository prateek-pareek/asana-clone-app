import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ActivityService } from './activity.service';
import { Activity, CreateActivityInput, UpdateActivityInput } from '../../shared/dto/activity.dto';

/**
 * Activity resolver for GraphQL operations
 */
@Resolver(() => Activity)
export class ActivityResolver {
  constructor(private readonly activityService: ActivityService) {}

  /**
   * Get activities by where clause (different signature from other entities)
   */
  @Query(() => [Activity])
  async activities(@Args('where') where: any): Promise<Activity[]> {
    return this.activityService.list(where);
  }

  /**
   * Create activity
   */
  @Mutation(() => Activity)
  async createActivity(@Args('input') input: CreateActivityInput): Promise<Activity> {
    return this.activityService.create(input);
  }

  /**
   * Update activity
   */
  @Mutation(() => Activity)
  async updateActivity(@Args('input') input: UpdateActivityInput): Promise<Activity> {
    return this.activityService.update(input);
  }
}
