import { Either } from '@/domain/core';
import {
  FamilyNotFoundError,
  UnexpectedError,
  UserNotAFamilyMemberError,
  UserNotFoundError,
} from '../errors';

export interface LeaveFamilyParams {
  userId: string;
  familyId: string;
}

export type LeaveFamilyErrors =
  | UnexpectedError
  | FamilyNotFoundError
  | UserNotFoundError
  | UserNotAFamilyMemberError;

export interface LeaveFamily {
  execute(request: LeaveFamilyParams): Promise<Either<LeaveFamilyErrors, void>>;
}
