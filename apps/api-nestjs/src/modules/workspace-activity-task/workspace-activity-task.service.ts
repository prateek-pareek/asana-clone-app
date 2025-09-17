import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WorkspaceActivityTask, WorkspaceActivityTaskDocument } from '../../database/schemas/workspace-activity-task.schema';
import { 
  CreateWorkspaceActivityTaskInput, 
  UpdateWorkspaceActivityTaskInput,
  WorkspaceActivityTaskConnection
} from '../../shared/dto/workspace-activity-task.dto';

/**
 * WorkspaceActivityTask service for workspace activity task operations
 */
@Injectable()
export class WorkspaceActivityTaskService {
  constructor(
    @InjectModel(WorkspaceActivityTask.name)
    private readonly workspaceActivityTaskModel: Model<WorkspaceActivityTaskDocument>,
  ) {}

  /**
   * Create a new workspace activity task
   */
  async create(input: CreateWorkspaceActivityTaskInput): Promise<WorkspaceActivityTask> {
    const workspaceActivityTask = new this.workspaceActivityTaskModel(input);
    const saved = await workspaceActivityTask.save();
    return saved;
  }

  /**
   * Update a workspace activity task
   */
  async update(input: UpdateWorkspaceActivityTaskInput): Promise<WorkspaceActivityTask> {
    const { id, ...updateData } = input;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const updatedWorkspaceActivityTask = await this.workspaceActivityTaskModel.findOneAndUpdate(
      { id },
      { ...cleanUpdateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedWorkspaceActivityTask) {
      throw new Error('Workspace activity task not found');
    }

    return updatedWorkspaceActivityTask;
  }

  /**
   * Get workspace activity task by ID
   */
  async getById(id: string): Promise<WorkspaceActivityTask> {
    const workspaceActivityTask = await this.workspaceActivityTaskModel.findOne({ id }).exec();
    if (!workspaceActivityTask) {
      throw new Error('Workspace activity task not found');
    }
    return workspaceActivityTask;
  }

  /**
   * Get workspace activity task by where clause
   */
  async get(where: any): Promise<WorkspaceActivityTask | null> {
    // TODO: Implement where clause filtering
    return this.workspaceActivityTaskModel.findOne(where || {}).exec();
  }

  /**
   * Get workspace activity tasks with pagination
   */
  async getWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: any
  ): Promise<WorkspaceActivityTaskConnection> {
    // TODO: Implement proper pagination logic
    const workspaceActivityTasks = await this.workspaceActivityTaskModel.find(where || {}).exec();
    
    return {
      totalCount: workspaceActivityTasks.length,
      edges: workspaceActivityTasks.map((workspaceActivityTask, index) => ({
        node: workspaceActivityTask,
        cursor: `cursor_${index}`,
      })),
    };
  }
}
