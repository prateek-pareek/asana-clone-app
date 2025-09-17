/**
 * Common types matching the Go API exactly
 */

export type ID = string;
export type Cursor = string;
export type Time = Date;
export type Map = Record<string, any>;
export type Any = any;

/**
 * Node interface for GraphQL
 */
export interface Node {
  id: ID;
}

/**
 * PageInfo for pagination
 */
export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: Cursor;
  endCursor?: Cursor;
}

/**
 * Connection interface for paginated results
 */
export interface Connection<T> {
  totalCount: number;
  pageInfo: PageInfo;
  edges: Edge<T>[];
}

/**
 * Edge interface for paginated results
 */
export interface Edge<T> {
  node?: T;
  cursor: Cursor;
}
