import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CustomError, isCustomError, ErrorCode } from './custom-errors';

/**
 * REST error handler matching Go HandleRestError
 */
@Injectable()
export class RestErrorHandler {
  private readonly codeToStatusMap: Record<string, HttpStatus> = {
    [ErrorCode.NOT_FOUND_ERROR]: HttpStatus.UNPROCESSABLE_ENTITY,
    [ErrorCode.DB_ERROR]: HttpStatus.INTERNAL_SERVER_ERROR,
    [ErrorCode.VALIDATION_ERROR]: HttpStatus.BAD_REQUEST,
    [ErrorCode.BAD_REQUEST_ERROR]: HttpStatus.BAD_REQUEST,
    [ErrorCode.AUTH_ERROR]: HttpStatus.UNAUTHORIZED,
    [ErrorCode.INTERNAL_SERVER_ERROR]: HttpStatus.INTERNAL_SERVER_ERROR,
  };

  /**
   * Handle REST API errors matching Go HandleRestError
   */
  handleRestError(error: Error, path: string): HttpException {
    if (!isCustomError(error)) {
      return new HttpException(
        {
          type: path,
          title: '[Internal server error]: Interface conversion error occurred. `err` should be implemented with Error() and Code()',
          status: HttpStatus.INTERNAL_SERVER_ERROR,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    const status = this.mapErrorCodeToHTTPStatus(error.code);
    const errorResponse = {
      type: path,
      title: error.message,
      status,
    };

    return new HttpException(errorResponse, status);
  }

  /**
   * Map error code to HTTP status matching Go implementation
   */
  private mapErrorCodeToHTTPStatus(code: string): HttpStatus {
    return this.codeToStatusMap[code] || HttpStatus.INTERNAL_SERVER_ERROR;
  }

  /**
   * Create a standardized error response
   */
  createErrorResponse(
    type: string,
    title: string,
    status: HttpStatus,
    extensions?: Record<string, any>
  ): HttpException {
    const errorResponse: any = {
      type,
      title,
      status,
    };

    if (extensions) {
      errorResponse.extensions = extensions;
    }

    return new HttpException(errorResponse, status);
  }
}
