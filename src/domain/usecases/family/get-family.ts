import { Either } from '@/domain/core';
import { Family } from '@/domain/entities';
import { UnexpectedError, UserNotAFamilyMemberError, UserNotFoundError } from '../errors';

export interface GetFamilyParams {
  userId: string;
}

export type GetFamilyErrors = UnexpectedError | UserNotFoundError | UserNotAFamilyMemberError;
export interface GetFamily {
  execute(params: GetFamilyParams): Promise<Either<GetFamilyErrors, Family>>;
}
