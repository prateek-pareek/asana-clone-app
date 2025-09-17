import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TestUser, TestUserDocument } from '../../database/schemas/test-user.schema';
import { CreateTestUserInput, UpdateTestUserInput, TestUserConnection } from '../../shared/dto/test-user.dto';

/**
 * TestUser service for test user operations
 */
@Injectable()
export class TestUserService {
  constructor(
    @InjectModel(TestUser.name)
    private readonly testUserModel: Model<TestUserDocument>,
  ) {}

  /**
   * Create a new test user
   */
  async create(input: CreateTestUserInput): Promise<TestUser> {
    const testUser = new this.testUserModel(input);
    const saved = await testUser.save();
    return saved;
  }

  /**
   * Create a test user and associated todo
   */
  async createUserAndTodo(input: CreateTestUserInput): Promise<TestUser> {
    // Create user first
    const testUser = new this.testUserModel(input);
    const savedUser = await testUser.save();

    // TODO: Create associated todo if needed
    // This would require TestTodo service dependency

    return savedUser;
  }

  /**
   * Update a test user
   */
  async update(input: UpdateTestUserInput): Promise<TestUser> {
    const { id, ...updateData } = input;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const updatedTestUser = await this.testUserModel.findOneAndUpdate(
      { id },
      { ...cleanUpdateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedTestUser) {
      throw new Error('Test user not found');
    }

    return updatedTestUser;
  }

  /**
   * Get test user by ID
   */
  async getById(id: string): Promise<TestUser> {
    const testUser = await this.testUserModel.findOne({ id }).exec();
    if (!testUser) {
      throw new Error('Test user not found');
    }
    return testUser;
  }

  /**
   * Get test users with pagination
   */
  async getWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: any
  ): Promise<TestUserConnection> {
    // TODO: Implement proper pagination logic
    const testUsers = await this.testUserModel.find(where || {}).exec();
    
    return {
      totalCount: testUsers.length,
      edges: testUsers.map((testUser, index) => ({
        node: testUser,
        cursor: `cursor_${index}`,
      })),
    };
  }
}
