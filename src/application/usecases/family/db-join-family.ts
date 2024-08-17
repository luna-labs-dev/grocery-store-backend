import {
  GetFamilyByInviteCodeRepository,
  GetUserByIdRepository,
  UpdateUserRepository,
} from '@/application/contracts';
import {
  Either,
  InvalidInviteCodeError,
  JoinFamily,
  JoinFamilyErrors,
  JoinFamilyParams,
  UserAlreadyAFamilyMemberError,
  UserNotFoundError,
  left,
  right,
} from '@/domain';
import { injection } from '@/main/di/injection-codes';
import { inject, injectable } from 'tsyringe';

const { infra } = injection;

@injectable()
export class DbJoinFamily implements JoinFamily {
  constructor(
    @inject(infra.userRepositories)
    private readonly userRepository: GetUserByIdRepository & UpdateUserRepository,
    @inject(infra.familyRepositories)
    private readonly familyRepository: GetFamilyByInviteCodeRepository,
  ) {}

  async execute({ userId, inviteCode }: JoinFamilyParams): Promise<Either<JoinFamilyErrors, void>> {
    // Get user
    const user = await this.userRepository.getByExternalId(userId);

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
      return left(new InvalidInviteCodeError());
    }

    user.familyId = family.id;

    await this.userRepository.update(user);

    // Add user to family
    return right(undefined);
  }
}
