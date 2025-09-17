import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';

/**
 * Service for converting GraphQL where inputs to MongoDB filter queries
 */
@Injectable()
export class WhereClauseService {
  /**
   * Convert TeammateWhereInput to MongoDB filter query
   */
  buildTeammateFilter(where: any): FilterQuery<any> {
    if (!where) return {};

    const filter: FilterQuery<any> = {};

    // Handle logical operators
    if (where.not) {
      const notFilter = this.buildTeammateFilter(where.not);
      return { $nor: [notFilter] };
    }

    if (where.or && where.or.length > 0) {
      const orFilters = where.or.map((orWhere: any) => this.buildTeammateFilter(orWhere));
      filter.$or = orFilters;
    }

    if (where.and && where.and.length > 0) {
      const andFilters = where.and.map((andWhere: any) => this.buildTeammateFilter(andWhere));
      filter.$and = andFilters;
    }

    // Handle ID field predicates
    if (where.id) filter.id = where.id;
    if (where.idNEQ) filter.id = { $ne: where.idNEQ };
    if (where.idIn && where.idIn.length > 0) filter.id = { $in: where.idIn };
    if (where.idNotIn && where.idNotIn.length > 0) filter.id = { $nin: where.idNotIn };
    if (where.idGT) filter.id = { $gt: where.idGT };
    if (where.idGTE) filter.id = { $gte: where.idGTE };
    if (where.idLT) filter.id = { $lt: where.idLT };
    if (where.idLTE) filter.id = { $lte: where.idLTE };

    // Handle name field predicates
    if (where.name) filter.name = where.name;
    if (where.nameNEQ) filter.name = { $ne: where.nameNEQ };
    if (where.nameIn && where.nameIn.length > 0) filter.name = { $in: where.nameIn };
    if (where.nameNotIn && where.nameNotIn.length > 0) filter.name = { $nin: where.nameNotIn };
    if (where.nameGT) filter.name = { $gt: where.nameGT };
    if (where.nameGTE) filter.name = { $gte: where.nameGTE };
    if (where.nameLT) filter.name = { $lt: where.nameLT };
    if (where.nameLTE) filter.name = { $lte: where.nameLTE };
    if (where.nameContains) filter.name = { $regex: where.nameContains, $options: 'i' };
    if (where.nameHasPrefix) filter.name = { $regex: `^${where.nameHasPrefix}`, $options: 'i' };
    if (where.nameHasSuffix) filter.name = { $regex: `${where.nameHasSuffix}$`, $options: 'i' };
    if (where.nameEqualFold) filter.name = { $regex: new RegExp(`^${where.nameEqualFold}$`, 'i') };
    if (where.nameContainsFold) filter.name = { $regex: where.nameContainsFold, $options: 'i' };

    // Handle email field predicates
    if (where.email) filter.email = where.email;
    if (where.emailNEQ) filter.email = { $ne: where.emailNEQ };
    if (where.emailIn && where.emailIn.length > 0) filter.email = { $in: where.emailIn };
    if (where.emailNotIn && where.emailNotIn.length > 0) filter.email = { $nin: where.emailNotIn };
    if (where.emailGT) filter.email = { $gt: where.emailGT };
    if (where.emailGTE) filter.email = { $gte: where.emailGTE };
    if (where.emailLT) filter.email = { $lt: where.emailLT };
    if (where.emailLTE) filter.email = { $lte: where.emailLTE };
    if (where.emailContains) filter.email = { $regex: where.emailContains, $options: 'i' };
    if (where.emailHasPrefix) filter.email = { $regex: `^${where.emailHasPrefix}`, $options: 'i' };
    if (where.emailHasSuffix) filter.email = { $regex: `${where.emailHasSuffix}$`, $options: 'i' };
    if (where.emailEqualFold) filter.email = { $regex: new RegExp(`^${where.emailEqualFold}$`, 'i') };
    if (where.emailContainsFold) filter.email = { $regex: where.emailContainsFold, $options: 'i' };

    // Handle avatar field predicates
    if (where.avatar) filter.avatar = where.avatar;
    if (where.avatarNEQ) filter.avatar = { $ne: where.avatarNEQ };
    if (where.avatarIn && where.avatarIn.length > 0) filter.avatar = { $in: where.avatarIn };
    if (where.avatarNotIn && where.avatarNotIn.length > 0) filter.avatar = { $nin: where.avatarNotIn };
    if (where.avatarGT) filter.avatar = { $gt: where.avatarGT };
    if (where.avatarGTE) filter.avatar = { $gte: where.avatarGTE };
    if (where.avatarLT) filter.avatar = { $lt: where.avatarLT };
    if (where.avatarLTE) filter.avatar = { $lte: where.avatarLTE };
    if (where.avatarContains) filter.avatar = { $regex: where.avatarContains, $options: 'i' };
    if (where.avatarHasPrefix) filter.avatar = { $regex: `^${where.avatarHasPrefix}`, $options: 'i' };
    if (where.avatarHasSuffix) filter.avatar = { $regex: `${where.avatarHasSuffix}$`, $options: 'i' };
    if (where.avatarEqualFold) filter.avatar = { $regex: new RegExp(`^${where.avatarEqualFold}$`, 'i') };
    if (where.avatarContainsFold) filter.avatar = { $regex: where.avatarContainsFold, $options: 'i' };

    // Handle timestamp field predicates
    if (where.createdAt) filter.createdAt = new Date(where.createdAt);
    if (where.createdAtNEQ) filter.createdAt = { $ne: new Date(where.createdAtNEQ) };
    if (where.createdAtIn && where.createdAtIn.length > 0) filter.createdAt = { $in: where.createdAtIn.map((d: string) => new Date(d)) };
    if (where.createdAtNotIn && where.createdAtNotIn.length > 0) filter.createdAt = { $nin: where.createdAtNotIn.map((d: string) => new Date(d)) };
    if (where.createdAtGT) filter.createdAt = { $gt: new Date(where.createdAtGT) };
    if (where.createdAtGTE) filter.createdAt = { $gte: new Date(where.createdAtGTE) };
    if (where.createdAtLT) filter.createdAt = { $lt: new Date(where.createdAtLT) };
    if (where.createdAtLTE) filter.createdAt = { $lte: new Date(where.createdAtLTE) };

    if (where.updatedAt) filter.updatedAt = new Date(where.updatedAt);
    if (where.updatedAtNEQ) filter.updatedAt = { $ne: new Date(where.updatedAtNEQ) };
    if (where.updatedAtIn && where.updatedAtIn.length > 0) filter.updatedAt = { $in: where.updatedAtIn.map((d: string) => new Date(d)) };
    if (where.updatedAtNotIn && where.updatedAtNotIn.length > 0) filter.updatedAt = { $nin: where.updatedAtNotIn.map((d: string) => new Date(d)) };
    if (where.updatedAtGT) filter.updatedAt = { $gt: new Date(where.updatedAtGT) };
    if (where.updatedAtGTE) filter.updatedAt = { $gte: new Date(where.updatedAtGTE) };
    if (where.updatedAtLT) filter.updatedAt = { $lt: new Date(where.updatedAtLT) };
    if (where.updatedAtLTE) filter.updatedAt = { $lte: new Date(where.updatedAtLTE) };

    return filter;
  }

  /**
   * Convert WorkspaceWhereInput to MongoDB filter query
   */
  buildWorkspaceFilter(where: any): FilterQuery<any> {
    if (!where) return {};

    const filter: FilterQuery<any> = {};

    // Handle logical operators
    if (where.not) {
      const notFilter = this.buildWorkspaceFilter(where.not);
      return { $nor: [notFilter] };
    }

    if (where.or && where.or.length > 0) {
      const orFilters = where.or.map((orWhere: any) => this.buildWorkspaceFilter(orWhere));
      filter.$or = orFilters;
    }

    if (where.and && where.and.length > 0) {
      const andFilters = where.and.map((andWhere: any) => this.buildWorkspaceFilter(andWhere));
      filter.$and = andFilters;
    }

    // Handle ID field predicates
    if (where.id) filter.id = where.id;
    if (where.idNEQ) filter.id = { $ne: where.idNEQ };
    if (where.idIn && where.idIn.length > 0) filter.id = { $in: where.idIn };
    if (where.idNotIn && where.idNotIn.length > 0) filter.id = { $nin: where.idNotIn };
    if (where.idGT) filter.id = { $gt: where.idGT };
    if (where.idGTE) filter.id = { $gte: where.idGTE };
    if (where.idLT) filter.id = { $lt: where.idLT };
    if (where.idLTE) filter.id = { $lte: where.idLTE };

    // Handle name field predicates
    if (where.name) filter.name = where.name;
    if (where.nameNEQ) filter.name = { $ne: where.nameNEQ };
    if (where.nameIn && where.nameIn.length > 0) filter.name = { $in: where.nameIn };
    if (where.nameNotIn && where.nameNotIn.length > 0) filter.name = { $nin: where.nameNotIn };
    if (where.nameGT) filter.name = { $gt: where.nameGT };
    if (where.nameGTE) filter.name = { $gte: where.nameGTE };
    if (where.nameLT) filter.name = { $lt: where.nameLT };
    if (where.nameLTE) filter.name = { $lte: where.nameLTE };
    if (where.nameContains) filter.name = { $regex: where.nameContains, $options: 'i' };
    if (where.nameHasPrefix) filter.name = { $regex: `^${where.nameHasPrefix}`, $options: 'i' };
    if (where.nameHasSuffix) filter.name = { $regex: `${where.nameHasSuffix}$`, $options: 'i' };
    if (where.nameEqualFold) filter.name = { $regex: new RegExp(`^${where.nameEqualFold}$`, 'i') };
    if (where.nameContainsFold) filter.name = { $regex: where.nameContainsFold, $options: 'i' };

    // Handle description field predicates
    if (where.description) filter.description = where.description;
    if (where.descriptionNEQ) filter.description = { $ne: where.descriptionNEQ };
    if (where.descriptionIn && where.descriptionIn.length > 0) filter.description = { $in: where.descriptionIn };
    if (where.descriptionNotIn && where.descriptionNotIn.length > 0) filter.description = { $nin: where.descriptionNotIn };
    if (where.descriptionGT) filter.description = { $gt: where.descriptionGT };
    if (where.descriptionGTE) filter.description = { $gte: where.descriptionGTE };
    if (where.descriptionLT) filter.description = { $lt: where.descriptionLT };
    if (where.descriptionLTE) filter.description = { $lte: where.descriptionLTE };
    if (where.descriptionContains) filter.description = { $regex: where.descriptionContains, $options: 'i' };
    if (where.descriptionHasPrefix) filter.description = { $regex: `^${where.descriptionHasPrefix}`, $options: 'i' };
    if (where.descriptionHasSuffix) filter.description = { $regex: `${where.descriptionHasSuffix}$`, $options: 'i' };
    if (where.descriptionEqualFold) filter.description = { $regex: new RegExp(`^${where.descriptionEqualFold}$`, 'i') };
    if (where.descriptionContainsFold) filter.description = { $regex: where.descriptionContainsFold, $options: 'i' };

    // Handle timestamp field predicates
    if (where.createdAt) filter.createdAt = new Date(where.createdAt);
    if (where.createdAtNEQ) filter.createdAt = { $ne: new Date(where.createdAtNEQ) };
    if (where.createdAtIn && where.createdAtIn.length > 0) filter.createdAt = { $in: where.createdAtIn.map((d: string) => new Date(d)) };
    if (where.createdAtNotIn && where.createdAtNotIn.length > 0) filter.createdAt = { $nin: where.createdAtNotIn.map((d: string) => new Date(d)) };
    if (where.createdAtGT) filter.createdAt = { $gt: new Date(where.createdAtGT) };
    if (where.createdAtGTE) filter.createdAt = { $gte: new Date(where.createdAtGTE) };
    if (where.createdAtLT) filter.createdAt = { $lt: new Date(where.createdAtLT) };
    if (where.createdAtLTE) filter.createdAt = { $lte: new Date(where.createdAtLTE) };

    if (where.updatedAt) filter.updatedAt = new Date(where.updatedAt);
    if (where.updatedAtNEQ) filter.updatedAt = { $ne: new Date(where.updatedAtNEQ) };
    if (where.updatedAtIn && where.updatedAtIn.length > 0) filter.updatedAt = { $in: where.updatedAtIn.map((d: string) => new Date(d)) };
    if (where.updatedAtNotIn && where.updatedAtNotIn.length > 0) filter.updatedAt = { $nin: where.updatedAtNotIn.map((d: string) => new Date(d)) };
    if (where.updatedAtGT) filter.updatedAt = { $gt: new Date(where.updatedAtGT) };
    if (where.updatedAtGTE) filter.updatedAt = { $gte: new Date(where.updatedAtGTE) };
    if (where.updatedAtLT) filter.updatedAt = { $lt: new Date(where.updatedAtLT) };
    if (where.updatedAtLTE) filter.updatedAt = { $lte: new Date(where.updatedAtLTE) };

    return filter;
  }

  /**
   * Convert ProjectWhereInput to MongoDB filter query
   */
  buildProjectFilter(where: any): FilterQuery<any> {
    if (!where) return {};

    const filter: FilterQuery<any> = {};

    // Handle logical operators
    if (where.not) {
      const notFilter = this.buildProjectFilter(where.not);
      return { $nor: [notFilter] };
    }

    if (where.or && where.or.length > 0) {
      const orFilters = where.or.map((orWhere: any) => this.buildProjectFilter(orWhere));
      filter.$or = orFilters;
    }

    if (where.and && where.and.length > 0) {
      const andFilters = where.and.map((andWhere: any) => this.buildProjectFilter(andWhere));
      filter.$and = andFilters;
    }

    // Handle ID field predicates
    if (where.id) filter.id = where.id;
    if (where.idNEQ) filter.id = { $ne: where.idNEQ };
    if (where.idIn && where.idIn.length > 0) filter.id = { $in: where.idIn };
    if (where.idNotIn && where.idNotIn.length > 0) filter.id = { $nin: where.idNotIn };
    if (where.idGT) filter.id = { $gt: where.idGT };
    if (where.idGTE) filter.id = { $gte: where.idGTE };
    if (where.idLT) filter.id = { $lt: where.idLT };
    if (where.idLTE) filter.id = { $lte: where.idLTE };

    // Handle workspace ID field predicates
    if (where.workspaceId) filter.workspaceId = where.workspaceId;
    if (where.workspaceIdNEQ) filter.workspaceId = { $ne: where.workspaceIdNEQ };
    if (where.workspaceIdIn && where.workspaceIdIn.length > 0) filter.workspaceId = { $in: where.workspaceIdIn };
    if (where.workspaceIdNotIn && where.workspaceIdNotIn.length > 0) filter.workspaceId = { $nin: where.workspaceIdNotIn };
    if (where.workspaceIdGT) filter.workspaceId = { $gt: where.workspaceIdGT };
    if (where.workspaceIdGTE) filter.workspaceId = { $gte: where.workspaceIdGTE };
    if (where.workspaceIdLT) filter.workspaceId = { $lt: where.workspaceIdLT };
    if (where.workspaceIdLTE) filter.workspaceId = { $lte: where.workspaceIdLTE };
    if (where.workspaceIdIsNil) filter.workspaceId = { $exists: false };
    if (where.workspaceIdNotNil) filter.workspaceId = { $exists: true };

    // Handle name field predicates
    if (where.name) filter.name = where.name;
    if (where.nameNEQ) filter.name = { $ne: where.nameNEQ };
    if (where.nameIn && where.nameIn.length > 0) filter.name = { $in: where.nameIn };
    if (where.nameNotIn && where.nameNotIn.length > 0) filter.name = { $nin: where.nameNotIn };
    if (where.nameGT) filter.name = { $gt: where.nameGT };
    if (where.nameGTE) filter.name = { $gte: where.nameGTE };
    if (where.nameLT) filter.name = { $lt: where.nameLT };
    if (where.nameLTE) filter.name = { $lte: where.nameLTE };
    if (where.nameContains) filter.name = { $regex: where.nameContains, $options: 'i' };
    if (where.nameHasPrefix) filter.name = { $regex: `^${where.nameHasPrefix}`, $options: 'i' };
    if (where.nameHasSuffix) filter.name = { $regex: `${where.nameHasSuffix}$`, $options: 'i' };
    if (where.nameEqualFold) filter.name = { $regex: new RegExp(`^${where.nameEqualFold}$`, 'i') };
    if (where.nameContainsFold) filter.name = { $regex: where.nameContainsFold, $options: 'i' };

    // Handle description field predicates
    if (where.description) filter.description = where.description;
    if (where.descriptionNEQ) filter.description = { $ne: where.descriptionNEQ };
    if (where.descriptionIn && where.descriptionIn.length > 0) filter.description = { $in: where.descriptionIn };
    if (where.descriptionNotIn && where.descriptionNotIn.length > 0) filter.description = { $nin: where.descriptionNotIn };
    if (where.descriptionGT) filter.description = { $gt: where.descriptionGT };
    if (where.descriptionGTE) filter.description = { $gte: where.descriptionGTE };
    if (where.descriptionLT) filter.description = { $lt: where.descriptionLT };
    if (where.descriptionLTE) filter.description = { $lte: where.descriptionLTE };
    if (where.descriptionContains) filter.description = { $regex: where.descriptionContains, $options: 'i' };
    if (where.descriptionHasPrefix) filter.description = { $regex: `^${where.descriptionHasPrefix}`, $options: 'i' };
    if (where.descriptionHasSuffix) filter.description = { $regex: `${where.descriptionHasSuffix}$`, $options: 'i' };
    if (where.descriptionEqualFold) filter.description = { $regex: new RegExp(`^${where.descriptionEqualFold}$`, 'i') };
    if (where.descriptionContainsFold) filter.description = { $regex: where.descriptionContainsFold, $options: 'i' };

    // Handle color field predicates
    if (where.color) filter.color = where.color;
    if (where.colorNEQ) filter.color = { $ne: where.colorNEQ };
    if (where.colorIn && where.colorIn.length > 0) filter.color = { $in: where.colorIn };
    if (where.colorNotIn && where.colorNotIn.length > 0) filter.color = { $nin: where.colorNotIn };
    if (where.colorGT) filter.color = { $gt: where.colorGT };
    if (where.colorGTE) filter.color = { $gte: where.colorGTE };
    if (where.colorLT) filter.color = { $lt: where.colorLT };
    if (where.colorLTE) filter.color = { $lte: where.colorLTE };
    if (where.colorContains) filter.color = { $regex: where.colorContains, $options: 'i' };
    if (where.colorHasPrefix) filter.color = { $regex: `^${where.colorHasPrefix}`, $options: 'i' };
    if (where.colorHasSuffix) filter.color = { $regex: `${where.colorHasSuffix}$`, $options: 'i' };
    if (where.colorEqualFold) filter.color = { $regex: new RegExp(`^${where.colorEqualFold}$`, 'i') };
    if (where.colorContainsFold) filter.color = { $regex: where.colorContainsFold, $options: 'i' };

    // Handle timestamp field predicates
    if (where.createdAt) filter.createdAt = new Date(where.createdAt);
    if (where.createdAtNEQ) filter.createdAt = { $ne: new Date(where.createdAtNEQ) };
    if (where.createdAtIn && where.createdAtIn.length > 0) filter.createdAt = { $in: where.createdAtIn.map((d: string) => new Date(d)) };
    if (where.createdAtNotIn && where.createdAtNotIn.length > 0) filter.createdAt = { $nin: where.createdAtNotIn.map((d: string) => new Date(d)) };
    if (where.createdAtGT) filter.createdAt = { $gt: new Date(where.createdAtGT) };
    if (where.createdAtGTE) filter.createdAt = { $gte: new Date(where.createdAtGTE) };
    if (where.createdAtLT) filter.createdAt = { $lt: new Date(where.createdAtLT) };
    if (where.createdAtLTE) filter.createdAt = { $lte: new Date(where.createdAtLTE) };

    if (where.updatedAt) filter.updatedAt = new Date(where.updatedAt);
    if (where.updatedAtNEQ) filter.updatedAt = { $ne: new Date(where.updatedAtNEQ) };
    if (where.updatedAtIn && where.updatedAtIn.length > 0) filter.updatedAt = { $in: where.updatedAtIn.map((d: string) => new Date(d)) };
    if (where.updatedAtNotIn && where.updatedAtNotIn.length > 0) filter.updatedAt = { $nin: where.updatedAtNotIn.map((d: string) => new Date(d)) };
    if (where.updatedAtGT) filter.updatedAt = { $gt: new Date(where.updatedAtGT) };
    if (where.updatedAtGTE) filter.updatedAt = { $gte: new Date(where.updatedAtGTE) };
    if (where.updatedAtLT) filter.updatedAt = { $lt: new Date(where.updatedAtLT) };
    if (where.updatedAtLTE) filter.updatedAt = { $lte: new Date(where.updatedAtLTE) };

    return filter;
  }

  /**
   * Convert TaskWhereInput to MongoDB filter query
   */
  buildTaskFilter(where: any): FilterQuery<any> {
    if (!where) return {};

    const filter: FilterQuery<any> = {};

    // Handle logical operators
    if (where.not) {
      const notFilter = this.buildTaskFilter(where.not);
      return { $nor: [notFilter] };
    }

    if (where.or && where.or.length > 0) {
      const orFilters = where.or.map((orWhere: any) => this.buildTaskFilter(orWhere));
      filter.$or = orFilters;
    }

    if (where.and && where.and.length > 0) {
      const andFilters = where.and.map((andWhere: any) => this.buildTaskFilter(andWhere));
      filter.$and = andFilters;
    }

    // Handle ID field predicates
    if (where.id) filter.id = where.id;
    if (where.idNEQ) filter.id = { $ne: where.idNEQ };
    if (where.idIn && where.idIn.length > 0) filter.id = { $in: where.idIn };
    if (where.idNotIn && where.idNotIn.length > 0) filter.id = { $nin: where.idNotIn };
    if (where.idGT) filter.id = { $gt: where.idGT };
    if (where.idGTE) filter.id = { $gte: where.idGTE };
    if (where.idLT) filter.id = { $lt: where.idLT };
    if (where.idLTE) filter.id = { $lte: where.idLTE };

    // Handle task parent ID field predicates
    if (where.taskParentID) filter.taskParentId = where.taskParentID;
    if (where.taskParentIDNEQ) filter.taskParentId = { $ne: where.taskParentIDNEQ };
    if (where.taskParentIDIn && where.taskParentIDIn.length > 0) filter.taskParentId = { $in: where.taskParentIDIn };
    if (where.taskParentIDNotIn && where.taskParentIDNotIn.length > 0) filter.taskParentId = { $nin: where.taskParentIDNotIn };
    if (where.taskParentIDGT) filter.taskParentId = { $gt: where.taskParentIDGT };
    if (where.taskParentIDGTE) filter.taskParentId = { $gte: where.taskParentIDGTE };
    if (where.taskParentIDLT) filter.taskParentId = { $lt: where.taskParentIDLT };
    if (where.taskParentIDLTE) filter.taskParentId = { $lte: where.taskParentIDLTE };
    if (where.taskParentIDIsNil) filter.taskParentId = { $exists: false };
    if (where.taskParentIDNotNil) filter.taskParentId = { $exists: true };

    // Handle task priority ID field predicates
    if (where.taskPriorityID) filter.taskPriorityId = where.taskPriorityID;
    if (where.taskPriorityIDNEQ) filter.taskPriorityId = { $ne: where.taskPriorityIDNEQ };
    if (where.taskPriorityIDIn && where.taskPriorityIDIn.length > 0) filter.taskPriorityId = { $in: where.taskPriorityIDIn };
    if (where.taskPriorityIDNotIn && where.taskPriorityIDNotIn.length > 0) filter.taskPriorityId = { $nin: where.taskPriorityIDNotIn };
    if (where.taskPriorityIDGT) filter.taskPriorityId = { $gt: where.taskPriorityIDGT };
    if (where.taskPriorityIDGTE) filter.taskPriorityId = { $gte: where.taskPriorityIDGTE };
    if (where.taskPriorityIDLT) filter.taskPriorityId = { $lt: where.taskPriorityIDLT };
    if (where.taskPriorityIDLTE) filter.taskPriorityId = { $lte: where.taskPriorityIDLTE };
    if (where.taskPriorityIDIsNil) filter.taskPriorityId = { $exists: false };
    if (where.taskPriorityIDNotNil) filter.taskPriorityId = { $exists: true };

    // Handle assignee ID field predicates
    if (where.assigneeId) filter.assigneeId = where.assigneeId;
    if (where.assigneeIdNEQ) filter.assigneeId = { $ne: where.assigneeIdNEQ };
    if (where.assigneeIdIn && where.assigneeIdIn.length > 0) filter.assigneeId = { $in: where.assigneeIdIn };
    if (where.assigneeIdNotIn && where.assigneeIdNotIn.length > 0) filter.assigneeId = { $nin: where.assigneeIdNotIn };
    if (where.assigneeIdGT) filter.assigneeId = { $gt: where.assigneeIdGT };
    if (where.assigneeIdGTE) filter.assigneeId = { $gte: where.assigneeIdGTE };
    if (where.assigneeIdLT) filter.assigneeId = { $lt: where.assigneeIdLT };
    if (where.assigneeIdLTE) filter.assigneeId = { $lte: where.assigneeIdLTE };
    if (where.assigneeIdIsNil) filter.assigneeId = { $exists: false };
    if (where.assigneeIdNotNil) filter.assigneeId = { $exists: true };

    // Handle created by field predicates
    if (where.createdBy) filter.createdBy = where.createdBy;
    if (where.createdByNEQ) filter.createdBy = { $ne: where.createdByNEQ };
    if (where.createdByIn && where.createdByIn.length > 0) filter.createdBy = { $in: where.createdByIn };
    if (where.createdByNotIn && where.createdByNotIn.length > 0) filter.createdBy = { $nin: where.createdByNotIn };
    if (where.createdByGT) filter.createdBy = { $gt: where.createdByGT };
    if (where.createdByGTE) filter.createdBy = { $gte: where.createdByGTE };
    if (where.createdByLT) filter.createdBy = { $lt: where.createdByLT };
    if (where.createdByLTE) filter.createdBy = { $lte: where.createdByLTE };
    if (where.createdByIsNil) filter.createdBy = { $exists: false };
    if (where.createdByNotNil) filter.createdBy = { $exists: true };

    // Handle name field predicates
    if (where.name) filter.name = where.name;
    if (where.nameNEQ) filter.name = { $ne: where.nameNEQ };
    if (where.nameIn && where.nameIn.length > 0) filter.name = { $in: where.nameIn };
    if (where.nameNotIn && where.nameNotIn.length > 0) filter.name = { $nin: where.nameNotIn };
    if (where.nameGT) filter.name = { $gt: where.nameGT };
    if (where.nameGTE) filter.name = { $gte: where.nameGTE };
    if (where.nameLT) filter.name = { $lt: where.nameLT };
    if (where.nameLTE) filter.name = { $lte: where.nameLTE };
    if (where.nameContains) filter.name = { $regex: where.nameContains, $options: 'i' };
    if (where.nameHasPrefix) filter.name = { $regex: `^${where.nameHasPrefix}`, $options: 'i' };
    if (where.nameHasSuffix) filter.name = { $regex: `${where.nameHasSuffix}$`, $options: 'i' };
    if (where.nameEqualFold) filter.name = { $regex: new RegExp(`^${where.nameEqualFold}$`, 'i') };
    if (where.nameContainsFold) filter.name = { $regex: where.nameContainsFold, $options: 'i' };

    // Handle boolean field predicates
    if (where.completed !== undefined) filter.completed = where.completed;
    if (where.completedNEQ !== undefined) filter.completed = { $ne: where.completedNEQ };
    if (where.isNew !== undefined) filter.isNew = where.isNew;
    if (where.isNewNEQ !== undefined) filter.isNew = { $ne: where.isNewNEQ };

    // Handle date field predicates
    if (where.dueDate) filter.dueDate = where.dueDate;
    if (where.dueDateNEQ) filter.dueDate = { $ne: where.dueDateNEQ };
    if (where.dueDateIn && where.dueDateIn.length > 0) filter.dueDate = { $in: where.dueDateIn };
    if (where.dueDateNotIn && where.dueDateNotIn.length > 0) filter.dueDate = { $nin: where.dueDateNotIn };
    if (where.dueDateGT) filter.dueDate = { $gt: where.dueDateGT };
    if (where.dueDateGTE) filter.dueDate = { $gte: where.dueDateGTE };
    if (where.dueDateLT) filter.dueDate = { $lt: where.dueDateLT };
    if (where.dueDateLTE) filter.dueDate = { $lte: where.dueDateLTE };
    if (where.dueDateIsNil) filter.dueDate = { $exists: false };
    if (where.dueDateNotNil) filter.dueDate = { $exists: true };

    if (where.dueTime) filter.dueTime = where.dueTime;
    if (where.dueTimeNEQ) filter.dueTime = { $ne: where.dueTimeNEQ };
    if (where.dueTimeIn && where.dueTimeIn.length > 0) filter.dueTime = { $in: where.dueTimeIn };
    if (where.dueTimeNotIn && where.dueTimeNotIn.length > 0) filter.dueTime = { $nin: where.dueTimeNotIn };
    if (where.dueTimeGT) filter.dueTime = { $gt: where.dueTimeGT };
    if (where.dueTimeGTE) filter.dueTime = { $gte: where.dueTimeGTE };
    if (where.dueTimeLT) filter.dueTime = { $lt: where.dueTimeLT };
    if (where.dueTimeLTE) filter.dueTime = { $lte: where.dueTimeLTE };
    if (where.dueTimeIsNil) filter.dueTime = { $exists: false };
    if (where.dueTimeNotNil) filter.dueTime = { $exists: true };

    if (where.completedAt) filter.completedAt = where.completedAt;
    if (where.completedAtNEQ) filter.completedAt = { $ne: where.completedAtNEQ };
    if (where.completedAtIn && where.completedAtIn.length > 0) filter.completedAt = { $in: where.completedAtIn };
    if (where.completedAtNotIn && where.completedAtNotIn.length > 0) filter.completedAt = { $nin: where.completedAtNotIn };
    if (where.completedAtGT) filter.completedAt = { $gt: where.completedAtGT };
    if (where.completedAtGTE) filter.completedAt = { $gte: where.completedAtGTE };
    if (where.completedAtLT) filter.completedAt = { $lt: where.completedAtLT };
    if (where.completedAtLTE) filter.completedAt = { $lte: where.completedAtLTE };
    if (where.completedAtIsNil) filter.completedAt = { $exists: false };
    if (where.completedAtNotNil) filter.completedAt = { $exists: true };

    // Handle timestamp field predicates
    if (where.createdAt) filter.createdAt = new Date(where.createdAt);
    if (where.createdAtNEQ) filter.createdAt = { $ne: new Date(where.createdAtNEQ) };
    if (where.createdAtIn && where.createdAtIn.length > 0) filter.createdAt = { $in: where.createdAtIn.map((d: string) => new Date(d)) };
    if (where.createdAtNotIn && where.createdAtNotIn.length > 0) filter.createdAt = { $nin: where.createdAtNotIn.map((d: string) => new Date(d)) };
    if (where.createdAtGT) filter.createdAt = { $gt: new Date(where.createdAtGT) };
    if (where.createdAtGTE) filter.createdAt = { $gte: new Date(where.createdAtGTE) };
    if (where.createdAtLT) filter.createdAt = { $lt: new Date(where.createdAtLT) };
    if (where.createdAtLTE) filter.createdAt = { $lte: new Date(where.createdAtLTE) };

    if (where.updatedAt) filter.updatedAt = new Date(where.updatedAt);
    if (where.updatedAtNEQ) filter.updatedAt = { $ne: new Date(where.updatedAtNEQ) };
    if (where.updatedAtIn && where.updatedAtIn.length > 0) filter.updatedAt = { $in: where.updatedAtIn.map((d: string) => new Date(d)) };
    if (where.updatedAtNotIn && where.updatedAtNotIn.length > 0) filter.updatedAt = { $nin: where.updatedAtNotIn.map((d: string) => new Date(d)) };
    if (where.updatedAtGT) filter.updatedAt = { $gt: new Date(where.updatedAtGT) };
    if (where.updatedAtGTE) filter.updatedAt = { $gte: new Date(where.updatedAtGTE) };
    if (where.updatedAtLT) filter.updatedAt = { $lt: new Date(where.updatedAtLT) };
    if (where.updatedAtLTE) filter.updatedAt = { $lte: new Date(where.updatedAtLTE) };

    return filter;
  }

  /**
   * Generic where clause builder for any entity
   */
  buildGenericFilter(where: any, fieldMappings: Record<string, string> = {}): FilterQuery<any> {
    if (!where) return {};

    const filter: FilterQuery<any> = {};

    // Handle logical operators
    if (where.not) {
      const notFilter = this.buildGenericFilter(where.not, fieldMappings);
      return { $nor: [notFilter] };
    }

    if (where.or && where.or.length > 0) {
      const orFilters = where.or.map((orWhere: any) => this.buildGenericFilter(orWhere, fieldMappings));
      filter.$or = orFilters;
    }

    if (where.and && where.and.length > 0) {
      const andFilters = where.and.map((andWhere: any) => this.buildGenericFilter(andWhere, fieldMappings));
      filter.$and = andFilters;
    }

    // Apply field mappings and build filters
    Object.keys(where).forEach(key => {
      if (key === 'not' || key === 'or' || key === 'and') return;

      const fieldName = fieldMappings[key] || key;
      const value = where[key];

      if (value === undefined || value === null) return;

      // Handle different predicate types
      if (key.endsWith('NEQ')) {
        filter[fieldName] = { $ne: value };
      } else if (key.endsWith('In')) {
        filter[fieldName] = { $in: value };
      } else if (key.endsWith('NotIn')) {
        filter[fieldName] = { $nin: value };
      } else if (key.endsWith('GT')) {
        filter[fieldName] = { $gt: value };
      } else if (key.endsWith('GTE')) {
        filter[fieldName] = { $gte: value };
      } else if (key.endsWith('LT')) {
        filter[fieldName] = { $lt: value };
      } else if (key.endsWith('LTE')) {
        filter[fieldName] = { $lte: value };
      } else if (key.endsWith('Contains')) {
        filter[fieldName] = { $regex: value, $options: 'i' };
      } else if (key.endsWith('HasPrefix')) {
        filter[fieldName] = { $regex: `^${value}`, $options: 'i' };
      } else if (key.endsWith('HasSuffix')) {
        filter[fieldName] = { $regex: `${value}$`, $options: 'i' };
      } else if (key.endsWith('EqualFold')) {
        filter[fieldName] = { $regex: new RegExp(`^${value}$`, 'i') };
      } else if (key.endsWith('ContainsFold')) {
        filter[fieldName] = { $regex: value, $options: 'i' };
      } else if (key.endsWith('IsNil')) {
        filter[fieldName] = { $exists: false };
      } else if (key.endsWith('NotNil')) {
        filter[fieldName] = { $exists: true };
      } else {
        // Direct field match
        filter[fieldName] = value;
      }
    });

    return filter;
  }
}
