import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GraphQLErrorHandler } from '../errors/graphql-error-handler';
import { RestErrorHandler } from '../errors/rest-error-handler';
import { CustomError, isCustomError } from '../errors/custom-errors';

/**
 * Global exception filter matching Go error handling patterns
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly graphqlErrorHandler: GraphQLErrorHandler,
    private readonly restErrorHandler: RestErrorHandler,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const contextType = host.getType();

    if (contextType === 'graphql') {
      this.handleGraphQLException(exception, host);
    } else {
      this.handleHTTPException(exception, host);
    }
  }

  private handleGraphQLException(exception: unknown, host: ArgumentsHost) {
    const gqlContext = GqlExecutionContext.create(host);
    const context = gqlContext.getContext();

    if (isCustomError(exception)) {
      const graphqlError = this.graphqlErrorHandler.createGraphQLError(exception);
      context.errors = context.errors || [];
      context.errors.push(graphqlError);
    } else if (exception instanceof Error) {
      const graphqlError = this.graphqlErrorHandler.wrapAsGraphQLError(exception);
      context.errors = context.errors || [];
      context.errors.push(graphqlError);
    }
  }

  private handleHTTPException(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let httpException: HttpException;

    if (exception instanceof HttpException) {
      httpException = exception;
    } else if (isCustomError(exception)) {
      httpException = this.restErrorHandler.handleRestError(
        exception,
        request.url
      );
    } else if (exception instanceof Error) {
      httpException = new HttpException(
        {
          type: request.url,
          title: exception.message,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    } else {
      httpException = new HttpException(
        {
          type: request.url,
          title: 'Internal server error',
          status: HttpStatus.INTERNAL_SERVER_ERROR,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    const status = httpException.getStatus();
    const errorResponse = httpException.getResponse();

    response.status(status).json(errorResponse);
  }
}
