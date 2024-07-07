import { UseCaseError } from '@/domain';

export class UserNotAFamilyMemberError extends Error implements UseCaseError {
  code: string;
  uuid?: string;

  constructor(uuid?: string) {
    super('The User is not a member of this Family');
    this.name = 'UserNotAFamilyMemberError';
    this.code = 'USER_NOT_A_FAMILY_MEMBER_ERROR';
    this.uuid = uuid;
  }
}
