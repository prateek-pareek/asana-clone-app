import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TestUser, TestUserSchema } from '../../database/schemas/test-user.schema';
import { TestUserService } from './test-user.service';
import { TestUserResolver } from './test-user.resolver';

/**
 * TestUser module for test user management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: TestUser.name, schema: TestUserSchema }])],
  providers: [TestUserService, TestUserResolver],
  exports: [TestUserService],
})
export class TestUserModule {}
