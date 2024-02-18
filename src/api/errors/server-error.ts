import { HttpError, HttpErrorResult } from '@/api/errors';

export class ServerError extends Error implements HttpError {
  constructor(stack: string) {
    super('Internal server error');
    this.name = 'ServerError';
    this.code = 'SERVER_ERROR';
    this.stack = stack;
  }

  toResult = (): HttpErrorResult => {
    return {
      code: this.code,
      message: this.message,
      uuid: this.uuid,
    };
  };

  code: string;
  uuid?: string;
}
