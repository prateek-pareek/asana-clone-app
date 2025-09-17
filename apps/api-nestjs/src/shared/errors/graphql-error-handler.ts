import { Injectable } from '@nestjs/common';
import { GraphQLError as ApolloGraphQLError } from 'graphql';
import { CustomError, isCustomError } from './custom-errors';

/**
 * GraphQL error handler matching Go HandleGraphQLError
 */
@Injectable()
export class GraphQLErrorHandler {
  /**
   * Handle GraphQL errors and add them to the GraphQL error list
   * Matches Go HandleGraphQLError function exactly
   */
  handleGraphQLError(error: Error): ApolloGraphQLError | null {
    if (!error) {
      return null;
    }

    let currentError: Error | null = error;
    const graphQLErrors: ApolloGraphQLError[] = [];

    while (currentError) {
      // Check if it's a custom error
      if (isCustomError(currentError)) {
        const apolloError = new ApolloGraphQLError(
          currentError.message,
          {
            extensions: currentError.extensions,
            code: currentError.code,
          }
        );

        graphQLErrors.push(apolloError);
      } else {
        // Handle non-custom errors
        const apolloError = new ApolloGraphQLError(
          currentError.message,
          {
            extensions: {
              code: 'UNKNOWN_ERROR',
            },
          }
        );

        graphQLErrors.push(apolloError);
      }

      // Unwrap the error to get the next one in the chain
      if (currentError instanceof Error && 'unwrap' in currentError) {
        currentError = (currentError as any).unwrap();
      } else {
        break;
      }
    }

    // Return the first error (most specific one)
    return graphQLErrors.length > 0 ? graphQLErrors[0] : null;
  }

  /**
   * Handle multiple errors
   */
  handleMultipleErrors(errors: Error[]): ApolloGraphQLError[] {
    return errors
      .map(error => this.handleGraphQLError(error))
      .filter((error): error is ApolloGraphQLError => error !== null);
  }

  /**
   * Create a GraphQL error from a custom error
   */
  createGraphQLError(customError: CustomError): ApolloGraphQLError {
    return new ApolloGraphQLError(
      customError.message,
      {
        extensions: customError.extensions,
        code: customError.code,
      }
    );
  }

  /**
   * Wrap a regular error as a GraphQL error
   */
  wrapAsGraphQLError(error: Error, code: string = 'UNKNOWN_ERROR'): ApolloGraphQLError {
    return new ApolloGraphQLError(
      error.message,
      {
        extensions: {
          code,
        },
      }
    );
  }
}
