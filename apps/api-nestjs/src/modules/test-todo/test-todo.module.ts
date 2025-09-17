import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TestTodo, TestTodoSchema } from '../../database/schemas/test-todo.schema';
import { TestTodoService } from './test-todo.service';
import { TestTodoResolver } from './test-todo.resolver';

/**
 * TestTodo module for test todo management
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: TestTodo.name, schema: TestTodoSchema }])],
  providers: [TestTodoService, TestTodoResolver],
  exports: [TestTodoService],
})
export class TestTodoModule {}
