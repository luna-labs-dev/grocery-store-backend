import { Either } from '../../core';
import { User } from '../../entities';
import { UnexpectedError } from '../errors';

export interface GetUserParams {
  externalId: string;
}

export type GetUserErrors = UnexpectedError;

export interface GetUser {
  execute(params: GetUserParams): Promise<Either<GetUserErrors, User>>;
}
