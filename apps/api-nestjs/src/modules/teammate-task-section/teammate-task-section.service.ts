import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeammateTaskSection, TeammateTaskSectionDocument } from '../../database/schemas/teammate-task-section.schema';
import { 
  CreateTeammateTaskSectionInput, 
  UpdateTeammateTaskSectionInput, 
  DeleteTeammateTaskSectionInput,
  DeleteTeammateTaskSectionAndKeepTasksInput,
  DeleteTeammateTaskSectionAndDeleteTasksInput,
  UndeleteTeammateTaskSectionAndKeepTasksInput,
  UndeleteTeammateTaskSectionAndDeleteTasksInput,
  TeammateTaskSectionConnection,
  DeleteTeammateTaskSectionAndKeepTasksPayload,
  DeleteTeammateTaskSectionAndDeleteTasksPayload,
  UndeleteTeammateTaskSectionAndKeepTasksPayload,
  UndeleteTeammateTaskSectionAndDeleteTasksPayload
} from '../../shared/dto/teammate-task-section.dto';

/**
 * TeammateTaskSection service for teammate task section operations
 */
@Injectable()
export class TeammateTaskSectionService {
  constructor(
    @InjectModel(TeammateTaskSection.name)
    private readonly teammateTaskSectionModel: Model<TeammateTaskSectionDocument>,
  ) {}

  /**
   * Create a new teammate task section
   */
  async create(input: CreateTeammateTaskSectionInput): Promise<TeammateTaskSection> {
    const teammateTaskSection = new this.teammateTaskSectionModel({
      ...input,
      name: `Section ${Date.now()}`, // Default name
      assigned: false,
    });
    const saved = await teammateTaskSection.save();
    return saved;
  }

  /**
   * Update a teammate task section
   */
  async update(input: UpdateTeammateTaskSectionInput): Promise<TeammateTaskSection> {
    const { id, ...updateData } = input;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const updatedSection = await this.teammateTaskSectionModel.findOneAndUpdate(
      { id },
      { ...cleanUpdateData, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!updatedSection) {
      throw new Error('Teammate task section not found');
    }

    return updatedSection;
  }

  /**
   * Delete a teammate task section
   */
  async delete(input: DeleteTeammateTaskSectionInput): Promise<TeammateTaskSection> {
    const section = await this.teammateTaskSectionModel.findOne({ id: input.id }).exec();
    
    if (!section) {
      throw new Error('Teammate task section not found');
    }

    await this.teammateTaskSectionModel.deleteOne({ id: input.id }).exec();
    return section;
  }

  /**
   * Delete teammate task section and keep tasks
   */
  async deleteAndKeepTasks(input: DeleteTeammateTaskSectionAndKeepTasksInput): Promise<DeleteTeammateTaskSectionAndKeepTasksPayload> {
    const section = await this.teammateTaskSectionModel.findOne({ id: input.id }).exec();
    
    if (!section) {
      throw new Error('Teammate task section not found');
    }

    // TODO: Implement task keeping logic
    const keptSection = await this.create({
      workspaceId: section.workspaceId,
      teammateId: section.teammateId,
      requestId: input.requestId,
    });

    await this.teammateTaskSectionModel.deleteOne({ id: input.id }).exec();

    return {
      teammateTaskSection: section,
      keptTeammateTaskSection: keptSection,
      teammateTaskIds: [], // TODO: Get actual teammate task IDs
    };
  }

  /**
   * Delete teammate task section and delete tasks
   */
  async deleteAndDeleteTasks(input: DeleteTeammateTaskSectionAndDeleteTasksInput): Promise<DeleteTeammateTaskSectionAndDeleteTasksPayload> {
    const section = await this.teammateTaskSectionModel.findOne({ id: input.id }).exec();
    
    if (!section) {
      throw new Error('Teammate task section not found');
    }

    // TODO: Implement task deletion logic
    await this.teammateTaskSectionModel.deleteOne({ id: input.id }).exec();

    return {
      teammateTaskSection: section,
      teammateTaskIds: [], // TODO: Get actual teammate task IDs
      taskIds: [], // TODO: Get actual task IDs
    };
  }

  /**
   * Undelete teammate task section and keep tasks
   */
  async undeleteAndKeepTasks(input: UndeleteTeammateTaskSectionAndKeepTasksInput): Promise<UndeleteTeammateTaskSectionAndKeepTasksPayload> {
    const section = new this.teammateTaskSectionModel({
      id: `section_${Date.now()}`,
      workspaceId: input.workspaceId,
      teammateId: input.teammateId,
      name: input.name,
      assigned: false,
      createdAt: new Date(input.createdAt),
      updatedAt: new Date(input.updatedAt),
    });

    const saved = await section.save();

    return {
      teammateTaskSection: saved,
      teammateTaskIds: input.keptTeammateTaskIds,
    };
  }

  /**
   * Undelete teammate task section and delete tasks
   */
  async undeleteAndDeleteTasks(input: UndeleteTeammateTaskSectionAndDeleteTasksInput): Promise<UndeleteTeammateTaskSectionAndDeleteTasksPayload> {
    const section = new this.teammateTaskSectionModel({
      id: `section_${Date.now()}`,
      workspaceId: input.workspaceId,
      teammateId: input.teammateId,
      name: input.name,
      assigned: false,
      createdAt: new Date(input.createdAt),
      updatedAt: new Date(input.updatedAt),
    });

    const saved = await section.save();

    return {
      teammateTaskSection: saved,
      teammateTasks: [], // TODO: Get actual teammate tasks
    };
  }

  /**
   * Get teammate task section by ID
   */
  async getById(id: string): Promise<TeammateTaskSection> {
    const section = await this.teammateTaskSectionModel.findOne({ id }).exec();
    if (!section) {
      throw new Error('Teammate task section not found');
    }
    return section;
  }

  /**
   * Get teammate task sections with pagination
   */
  async getWithPagination(
    after?: string,
    first?: number,
    before?: string,
    last?: number,
    where?: any
  ): Promise<TeammateTaskSectionConnection> {
    // TODO: Implement proper pagination logic
    const sections = await this.teammateTaskSectionModel.find(where || {}).exec();
    
    return {
      totalCount: sections.length,
      edges: sections.map((section, index) => ({
        node: section,
        cursor: `cursor_${index}`,
      })),
    };
  }
}
