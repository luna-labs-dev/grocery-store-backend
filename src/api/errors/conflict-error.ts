import { HttpError, HttpErrorResult } from './http-error';

import { UseCaseError } from '@/domain';

export class ConflictError extends Error implements HttpError {
  constructor(error?: UseCaseError) {
    super(error?.message ?? 'Conflict');
    this.name = error?.name ?? 'ConflictError';
    this.code = error?.code ?? 'CONFLICT_ERROR';
    this.extras = error?.extras;
  }

  toResult = (): HttpErrorResult => {
    return {
      code: this.code,
      message: this.message,
      uuid: this.uuid,
      ...this.extras,
    };
  };

  code: string;
  uuid?: string;
  extras?: any;
}
