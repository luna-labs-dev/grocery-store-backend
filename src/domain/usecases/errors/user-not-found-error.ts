import { UseCaseError } from '@/domain/core';

export class UserNotFoundError extends Error implements UseCaseError {
  code: string;
  uuid?: string;

  constructor(uuid?: string) {
    super('User not found');
    this.name = 'UserNotFoundError';
    this.code = 'USER_NOT_FOUND_ERROR';
    this.uuid = uuid;
  }
}
