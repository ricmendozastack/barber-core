import { AxiosError } from 'axios';

export type ApiErrorCode = 'NETWORK_ERROR' | 'VALIDATION_ERROR' | 'UNAUTHORIZED' | 'UNKNOWN';

export class ApiError extends Error {
  code: ApiErrorCode;
  status?: number;

  constructor(message: string, code: ApiErrorCode, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
  }
}

export function normalizeApiError(error: AxiosError): ApiError {
  if (!error.response) {
    return new ApiError('Network error', 'NETWORK_ERROR');
  }
  const status = error.response.status;
  if (status === 401) return new ApiError('Unauthorized', 'UNAUTHORIZED', status);
  if (status === 422 || status === 400) {
    return new ApiError('Validation error', 'VALIDATION_ERROR', status);
  }
  return new ApiError(error.message, 'UNKNOWN', status);
}
