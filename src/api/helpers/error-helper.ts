import { HttpResponse } from '../contracts';

import { errorMapper } from './error-mapper';
import { badRequest } from './http-helper';

import { UseCaseError } from '@/domain';

export const mapErrorByCode = (error: UseCaseError): HttpResponse => {
  const errorResponse = errorMapper[error.code];

  if (!errorResponse) {
    return badRequest(error);
  }

  return errorResponse(error);
};
