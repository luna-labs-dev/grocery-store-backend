import {
  GetFamilyByInviteCodeRepository,
  GetUserByIdRepository,
  UpdateUserRepository,
} from '@/application/contracts';
import {
  Either,
  Family,
  InvalidInviteCodeError,
  JoinFamily,
  JoinFamilyErrors,
  JoinFamilyParams,
  UserAlreadyAFamilyMemberError,
  UserNotFoundError,
  left,
  right,
} from '@/domain';

export class DbJoinFamily implements JoinFamily {
  constructor(
    private readonly userRepository: GetUserByIdRepository & UpdateUserRepository,
    private readonly familyRepository: GetFamilyByInviteCodeRepository,
  ) {}

  async execute({
    userId,
    inviteCode,
  }: JoinFamilyParams): Promise<Either<JoinFamilyErrors, Family>> {
    // Get user
    const user = await this.userRepository.getById(userId);

    if (!user) {
      return left(new UserNotFoundError(userId));
    }

    // If user already a family member, return error
    if (user.family) {
      return left(new UserAlreadyAFamilyMemberError());
    }

    // Get family by invite code
    const family = await this.familyRepository.getByInviteCode({
      inviteCode,
    });

    if (!family) {
      // TODO: return InvalidInviteCodeError
      return left(new InvalidInviteCodeError());
    }

    user.familyId = family.id;

    await this.userRepository.update(user);

    // Add user to family
    return right(family);
  }
}
