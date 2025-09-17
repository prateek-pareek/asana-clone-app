import { Injectable } from '@nestjs/common';
import { Model, Document } from 'mongoose';

export interface PaginationOptions {
  after?: string;
  first?: number;
  before?: string;
  last?: number;
}

export interface PaginationResult<T> {
  totalCount: number;
  edges: Array<{
    node: T;
    cursor: string;
  }>;
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
  };
}

/**
 * Service for handling cursor-based pagination
 */
@Injectable()
export class PaginationService {
  /**
   * Apply pagination to a MongoDB query
   */
  async paginate<T extends Document>(
    model: Model<T>,
    filter: any,
    options: PaginationOptions,
    sortField: string = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'desc'
  ): Promise<PaginationResult<T>> {
    const { after, first, before, last } = options;

    // Get total count
    const totalCount = await model.countDocuments(filter);

    // Build sort object
    const sort: any = {};
    sort[sortField] = sortOrder === 'desc' ? -1 : 1;

    let query = model.find(filter).sort(sort);

    // Apply cursor-based pagination
    if (after) {
      const afterDoc = await model.findById(after);
      if (afterDoc) {
        const afterValue = afterDoc.get(sortField);
        if (sortOrder === 'desc') {
          query = query.where(sortField).lt(afterValue);
        } else {
          query = query.where(sortField).gt(afterValue);
        }
      }
    }

    if (before) {
      const beforeDoc = await model.findById(before);
      if (beforeDoc) {
        const beforeValue = beforeDoc.get(sortField);
        if (sortOrder === 'desc') {
          query = query.where(sortField).gt(beforeValue);
        } else {
          query = query.where(sortField).lt(beforeValue);
        }
      }
    }

    // Apply limit
    const limit = first || last || 10;
    query = query.limit(limit + 1); // +1 to check if there are more results

    // Execute query
    const results = await query.exec();

    // Check if there are more results
    const hasMore = results.length > limit;
    if (hasMore) {
      results.pop(); // Remove the extra result
    }

    // Build edges
    const edges = results.map((node, index) => ({
      node,
      cursor: this.encodeCursor(node._id.toString(), node.get(sortField))
    }));

    // Build page info
    const pageInfo = {
      hasNextPage: hasMore,
      hasPreviousPage: after ? true : false,
      startCursor: edges.length > 0 ? edges[0].cursor : undefined,
      endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : undefined
    };

    return {
      totalCount,
      edges,
      pageInfo
    };
  }

  /**
   * Encode cursor from ID and sort value
   */
  private encodeCursor(id: string, sortValue: any): string {
    const cursorData = {
      id,
      sortValue: sortValue instanceof Date ? sortValue.toISOString() : sortValue
    };
    return Buffer.from(JSON.stringify(cursorData)).toString('base64');
  }

  /**
   * Decode cursor to get ID and sort value
   */
  private decodeCursor(cursor: string): { id: string; sortValue: any } | null {
    try {
      const decoded = Buffer.from(cursor, 'base64').toString('utf-8');
      return JSON.parse(decoded);
    } catch {
      return null;
    }
  }

  /**
   * Simple offset-based pagination (fallback)
   */
  async paginateWithOffset<T extends Document>(
    model: Model<T>,
    filter: any,
    page: number = 1,
    limit: number = 10,
    sortField: string = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'desc'
  ): Promise<{
    data: T[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }> {
    const skip = (page - 1) * limit;
    const sort: any = {};
    sort[sortField] = sortOrder === 'desc' ? -1 : 1;

    const [data, totalCount] = await Promise.all([
      model.find(filter).sort(sort).skip(skip).limit(limit).exec(),
      model.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      data,
      totalCount,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1
    };
  }
}
