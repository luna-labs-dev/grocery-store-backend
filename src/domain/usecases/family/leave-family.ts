import { Either } from '@/domain/core';
import { UnexpectedError, UserNotAFamilyMemberError, UserNotFoundError } from '../errors';

export interface LeaveFamilyParams {
  userId: string;
}

export type LeaveFamilyErrors = UnexpectedError | UserNotFoundError | UserNotAFamilyMemberError;

export interface LeaveFamily {
  execute(request: LeaveFamilyParams): Promise<Either<LeaveFamilyErrors, void>>;
}
