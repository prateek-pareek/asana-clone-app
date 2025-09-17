import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TestTodo, TestTodoDocument } from '../../database/schemas/test-todo.schema';
import { CreateTestTodoInput, UpdateTestTodoInput, TestTodoConnection } from '../../shared/dto/test-todo.dto';

/**
 * TestTodo service for test todo operations
 */
@Injectable()
export class TestTodoService {
  constructor(
    @InjectModel(TestTodo.name)
    private readonly testTodoModel: Model<TestTodoDocument>,
  ) {}

  /**
   * Create a new test todo
   */
  async create(input: CreateTestTodoInput): Promise<TestTodo> {
    const testTodo = new this.testTodoModel(input);
    const saved = await testTodo.save();
    return saved;
  }

  /**
   * Update a test todo
   */
  async update(input: UpdateTestTodoInput): Promise<TestTodo> {
    const { id, ...updateData } = input;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const updatedTestTodo = await this.testTodoModel.findOneAndUpdate(
      { id },
      { ...cleanUpdateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedTestTodo) {
      throw new Error('Test todo not found');
    }

    return updatedTestTodo;
  }

  /**
   * Get test todo by ID
   */
  async getById(id: string): Promise<TestTodo> {
    const testTodo = await this.testTodoModel.findOne({ id }).exec();
    if (!testTodo) {
      throw new Error('Test todo not found');
    }
    return testTodo;
  }

  /**
   * Get test todos with pagination
   */
  async getWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: any
  ): Promise<TestTodoConnection> {
    // TODO: Implement proper pagination logic
    const testTodos = await this.testTodoModel.find(where || {}).exec();
    
    return {
      totalCount: testTodos.length,
      edges: testTodos.map((testTodo, index) => ({
        node: testTodo,
        cursor: `cursor_${index}`,
      })),
    };
  }
}
