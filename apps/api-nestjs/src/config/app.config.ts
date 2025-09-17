import { registerAs } from '@nestjs/config';

/**
 * Application configuration factory
 */
export const appConfig = registerAs('app', () => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  firebaseServiceKey: process.env.FIREBASE_SERVICE_KEY,
  corsOrigin: process.env.CORS_ORIGIN || '*',
}));
