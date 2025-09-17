import { registerAs } from '@nestjs/config';

/**
 * Database configuration factory for MongoDB
 */
export const databaseConfig = registerAs('database', () => ({
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/asana_clone',
  useNewUrlParser: true,
  useUnifiedTopology: true,
}));
