import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { TagService } from './tag.service';
import { ID } from '../../shared/types/common.types';

/**
 * Tag resolver for GraphQL operations
 */
@Resolver()
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  /**
   * Get tag by ID
   */
  @Query(() => String, { nullable: true })
  async tag(@Args('id', { type: () => ID }) id: string): Promise<string | null> {
    try {
      const tag = await this.tagService.getById(id);
      return tag.name;
    } catch {
      return null;
    }
  }

  /**
   * List all tags
   */
  @Query(() => [String])
  async tags(): Promise<string[]> {
    const tags = await this.tagService.list();
    return tags.map(tag => tag.name);
  }

  /**
   * Create tag
   */
  @Mutation(() => String)
  async createTag(@Args('input') input: any): Promise<string> {
    const tag = await this.tagService.create(input);
    return tag.name;
  }

  /**
   * Update tag
   */
  @Mutation(() => String)
  async updateTag(@Args('input') input: any): Promise<string> {
    const tag = await this.tagService.update(input);
    return tag.name;
  }

  /**
   * Subscribe to tag updates
   */
  @Subscription(() => String)
  async tagUpdated(@Args('id', { type: () => ID }) id: string): Promise<AsyncIterator<string>> {
    // In a real implementation, you would use a pub/sub system
    // For now, we'll return an empty async iterator
    return {
      [Symbol.asyncIterator]: async function* () {
        // Empty implementation
      }
    };
  }
}
