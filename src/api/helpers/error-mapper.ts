import { notFound, serverError, unprocessableEntity } from './http-helper';

import { UseCaseError } from '@/domain';

export const errorMapper: Record<string, any> = {
  UNEXPECTED_ERROR: (error: UseCaseError) => serverError(error),
  MARKET_ALREADY_EXISTS_ERROR: (error: UseCaseError) => unprocessableEntity(error),
  MARKET_NOT_FOUND_ERROR: (error: UseCaseError) => notFound(error),
};
