import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';

/**
 * Auth resolver for GraphQL operations
 */
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  /**
   * Revoke refresh tokens
   */
  @Mutation(() => String)
  async revokeRefreshTokens(): Promise<string> {
    const result = await this.authService.revokeRefreshTokens();
    return result.success ? 'success' : 'failed';
  }
}
