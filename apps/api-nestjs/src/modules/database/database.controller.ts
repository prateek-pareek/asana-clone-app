import { Controller, Get, Post } from '@nestjs/common';

/**
 * Database controller for REST endpoints
 */
@Controller('api')
export class DatabaseController {
  /**
   * Health check endpoint
   */
  @Get('readiness_check')
  getReadinessCheck(): string {
    return 'ok';
  }

  /**
   * Seed table endpoint
   */
  @Get('seedTable')
  async seedTable(): Promise<{ success: boolean }> {
    // This is a simplified implementation
    // In a real app, you'd implement proper seeding logic
    return { success: true };
  }

  /**
   * Revoke refresh tokens endpoint
   */
  @Post('revoke_refresh_tokens')
  async revokeRefreshTokens(): Promise<{ success: boolean }> {
    // This is a simplified implementation
    // In a real app, you'd implement proper token revocation
    return { success: true };
  }
}
