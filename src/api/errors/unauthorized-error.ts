import { HttpError } from './http-error';

export class UnauthorizedError extends HttpError {
  constructor() {
    super({
      message: 'Unauthorized',
      name: 'UnauthorizedError',
      code: 'UNAUTHORIZED_ERROR',
    });
  }
}
