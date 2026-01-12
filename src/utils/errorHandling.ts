import { ErrorType } from '../components/ErrorDisplay';

/**
 * Determines the error type from an error object.
 * Checks error properties (code, name) first, then falls back to message content.
 */
export const getErrorType = (error: unknown): ErrorType => {
  // Check if it's an Error object with network-related properties
  if (error instanceof Error) {
    // Check error name for network-related errors
    const errorName = error.name?.toLowerCase() || '';
    if (
      errorName.includes('network') ||
      errorName.includes('timeout') ||
      errorName.includes('fetch') ||
      errorName === 'networkerror' ||
      errorName === 'typeerror'
    ) {
      return 'network';
    }

    // Check error code (common in network errors)
    const errorCode = (error as any).code?.toLowerCase() || '';
    if (
      errorCode.includes('network') ||
      errorCode.includes('timeout') ||
      errorCode === 'enetunreach' ||
      errorCode === 'econnrefused' ||
      errorCode === 'etimedout'
    ) {
      return 'network';
    }

    // Check message as fallback
    const errorMessage = error.message?.toLowerCase() || '';
    if (
      errorMessage.includes('network') ||
      errorMessage.includes('connection') ||
      errorMessage.includes('timeout') ||
      errorMessage.includes('fetch failed') ||
      errorMessage.includes('network request failed')
    ) {
      return 'network';
    }
  }

  // Default to 'data' for other errors
  return 'data';
};

/**
 * Extracts a user-friendly error message from an error object.
 */
export const getErrorMessage = (error: unknown, fallback: string): string => {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
};
