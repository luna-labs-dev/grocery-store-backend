import { Either } from '@/domain/core';
import { UnexpectedError, UserAlreadyExistsError } from '../errors';

export interface AddUserParams {
  externalId: string;
}

export type AddUserErrors = UnexpectedError | UserAlreadyExistsError;
export interface AddUser {
  execute(params: AddUserParams): Promise<Either<AddUserErrors, void>>;
}
