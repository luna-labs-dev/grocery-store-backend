import { Either } from '@/domain/core';
import { Family } from '@/domain/entities';
import { UnexpectedError, UserNotFoundError } from '../errors';

export interface AddFamilyParams {
  userId: string;
  name: string;
  description?: string;
}

export type AddFamilyErrors = UnexpectedError | UserNotFoundError;

export interface AddFamily {
  execute(request: any): Promise<Either<AddFamilyErrors, Family>>;
}
