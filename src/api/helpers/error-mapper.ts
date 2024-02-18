import { notFound, serverError } from './http-helper';

import { UseCaseError } from '@/domain';

export const errorMapper: Record<string, any> = {
  UNEXPECTED_ERROR: (error: UseCaseError) => serverError(error),
  EXAMINATION_NOT_FOUND_ERROR: (error: UseCaseError) => notFound(error),
  FILE_NOT_FOUND_ERROR: (error: UseCaseError) => notFound(error),
};
