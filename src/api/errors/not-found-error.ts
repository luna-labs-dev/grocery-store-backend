import { HttpError, HttpErrorResult } from './http-error';

import { UseCaseError } from '@/domain';

export class NotFoundError extends Error implements HttpError {
  code: string;
  uuid?: string;
  constructor(error: UseCaseError) {
    super(error.message);
    this.name = error.name;
    this.code = error.code;
    this.uuid = error.uuid;
  }

  toResult = (): HttpErrorResult => {
    return {
      code: this.code,
      message: this.message,
      uuid: this.uuid,
    };
  };
}
