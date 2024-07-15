import { Either } from '@/domain/core';
import { Family } from '@/domain/entities';
import {
  InvalidInviteCodeError,
  UnexpectedError,
  UserAlreadyAFamilyMemberError,
  UserNotFoundError,
} from '../errors';

export interface JoinFamilyParams {
  userId: string;
  inviteCode: string;
}

export type JoinFamilyErrors =
  | UnexpectedError
  | UserNotFoundError
  | UserAlreadyAFamilyMemberError
  | InvalidInviteCodeError;

export interface JoinFamily {
  execute(params: JoinFamilyParams): Promise<Either<JoinFamilyErrors, Family>>;
}
