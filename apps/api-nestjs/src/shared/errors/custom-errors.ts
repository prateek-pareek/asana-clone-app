/**
 * Custom error types matching Go API error handling
 */

export enum ErrorCode {
  DB_ERROR = 'DB_ERROR',
  GRAPHQL_ERROR = 'GRAPHQL_ERROR',
  NOT_FOUND_ERROR = 'NOT_FOUND_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  BAD_REQUEST_ERROR = 'BAD_REQUEST_ERROR',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  AUTH_ERROR = 'AUTH_ERROR',
}

export interface ErrorExtensions {
  code: string;
  value?: any;
  [key: string]: any;
}

export interface CustomError extends Error {
  code: string;
  extensions: ErrorExtensions;
  unwrap(): Error | null;
}

/**
 * Base error class matching Go error structure
 */
export class BaseError extends Error implements CustomError {
  public readonly code: string;
  public readonly extensions: ErrorExtensions;
  private readonly wrappedError: Error | null;

  constructor(
    code: string,
    message: string,
    extensions: ErrorExtensions,
    wrappedError?: Error
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.extensions = extensions;
    this.wrappedError = wrappedError || null;

    // Maintain proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  unwrap(): Error | null {
    return this.wrappedError;
  }
}

/**
 * Database error matching Go NewDBError
 */
export class DatabaseError extends BaseError {
  constructor(error: Error) {
    super(
      ErrorCode.DB_ERROR,
      error.message,
      {
        code: ErrorCode.DB_ERROR,
      },
      error
    );
  }
}

/**
 * GraphQL error matching Go NewGraphQLError
 */
export class GraphQLError extends BaseError {
  constructor(error: Error) {
    super(
      ErrorCode.GRAPHQL_ERROR,
      error.message,
      {
        code: ErrorCode.GRAPHQL_ERROR,
      },
      error
    );
  }
}

/**
 * Not found error matching Go NewNotFoundError
 */
export class NotFoundError extends BaseError {
  constructor(error: Error, value?: any) {
    super(
      ErrorCode.NOT_FOUND_ERROR,
      error.message,
      {
        code: ErrorCode.NOT_FOUND_ERROR,
        value,
      },
      error
    );
  }
}

/**
 * Invalid parameter error matching Go NewInvalidParamError
 */
export class InvalidParamError extends BaseError {
  constructor(value?: any) {
    const error = new Error('invalid params error');
    super(
      ErrorCode.BAD_REQUEST_ERROR,
      error.message,
      {
        code: ErrorCode.BAD_REQUEST_ERROR,
        value,
      },
      error
    );
  }
}

/**
 * Validation error matching Go NewValidationError
 */
export class ValidationError extends BaseError {
  constructor(error: Error) {
    super(
      ErrorCode.VALIDATION_ERROR,
      error.message,
      {
        code: ErrorCode.VALIDATION_ERROR,
      },
      error
    );
  }
}

/**
 * Authentication error matching Go NewAuthError
 */
export class AuthError extends BaseError {
  constructor(error: Error) {
    super(
      ErrorCode.AUTH_ERROR,
      error.message,
      {
        code: ErrorCode.AUTH_ERROR,
      },
      error
    );
  }
}

/**
 * Internal server error matching Go NewInternalServerError
 */
export class InternalServerError extends BaseError {
  constructor(error: Error) {
    super(
      ErrorCode.INTERNAL_SERVER_ERROR,
      error.message,
      {
        code: ErrorCode.INTERNAL_SERVER_ERROR,
      },
      error
    );
  }
}

/**
 * Error factory functions matching Go API
 */
export class ErrorFactory {
  static newDBError(error: Error): DatabaseError {
    return new DatabaseError(error);
  }

  static newGraphQLError(error: Error): GraphQLError {
    return new GraphQLError(error);
  }

  static newNotFoundError(error: Error, value?: any): NotFoundError {
    return new NotFoundError(error, value);
  }

  static newInvalidParamError(value?: any): InvalidParamError {
    return new InvalidParamError(value);
  }

  static newValidationError(error: Error): ValidationError {
    return new ValidationError(error);
  }

  static newAuthError(error: Error): AuthError {
    return new AuthError(error);
  }

  static newInternalServerError(error: Error): InternalServerError {
    return new InternalServerError(error);
  }
}

/**
 * Error type guards
 */
export function isCustomError(error: any): error is CustomError {
  return error && typeof error.code === 'string' && typeof error.extensions === 'object';
}

export function isDatabaseError(error: any): error is DatabaseError {
  return isCustomError(error) && error.code === ErrorCode.DB_ERROR;
}

export function isNotFoundError(error: any): error is NotFoundError {
  return isCustomError(error) && error.code === ErrorCode.NOT_FOUND_ERROR;
}

export function isValidationError(error: any): error is ValidationError {
  return isCustomError(error) && error.code === ErrorCode.VALIDATION_ERROR;
}

export function isAuthError(error: any): error is AuthError {
  return isCustomError(error) && error.code === ErrorCode.AUTH_ERROR;
}
