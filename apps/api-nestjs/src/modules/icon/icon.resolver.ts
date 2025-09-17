import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { IconService } from './icon.service';
import { ID } from '../../shared/types/common.types';

/**
 * Icon resolver for GraphQL operations
 */
@Resolver()
export class IconResolver {
  constructor(private readonly iconService: IconService) {}

  /**
   * Get icon by ID
   */
  @Query(() => String, { nullable: true })
  async icon(@Args('id', { type: () => ID }) id: string): Promise<string | null> {
    try {
      const icon = await this.iconService.getById(id);
      return icon.name;
    } catch {
      return null;
    }
  }

  /**
   * List all icons
   */
  @Query(() => [String])
  async icons(): Promise<string[]> {
    const icons = await this.iconService.list();
    return icons.map(icon => icon.name);
  }

  /**
   * Create icon
   */
  @Mutation(() => String)
  async createIcon(@Args('input') input: any): Promise<string> {
    const icon = await this.iconService.create(input);
    return icon.name;
  }

  /**
   * Update icon
   */
  @Mutation(() => String)
  async updateIcon(@Args('input') input: any): Promise<string> {
    const icon = await this.iconService.update(input);
    return icon.name;
  }

  /**
   * Subscribe to icon updates
   */
  @Subscription(() => String)
  async iconUpdated(@Args('id', { type: () => ID }) id: string): Promise<AsyncIterator<string>> {
    // In a real implementation, you would use a pub/sub system
    // For now, we'll return an empty async iterator
    return {
      [Symbol.asyncIterator]: async function* () {
        // Empty implementation
      }
    };
  }
}
