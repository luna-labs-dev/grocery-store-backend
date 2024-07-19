import { FamilyRepositories, UserRepositories } from '@/application/contracts';
import {
  Either,
  LeaveFamily,
  LeaveFamilyErrors,
  LeaveFamilyParams,
  UnexpectedError,
  UserNotAFamilyMemberError,
  UserNotFoundError,
  left,
  right,
} from '@/domain';
import { injection } from '@/main/di/injection-codes';
import { inject, injectable } from 'tsyringe';

const { infra } = injection;

@injectable()
export class DbLeaveFamily implements LeaveFamily {
  constructor(
    @inject(infra.userRepositories) private readonly userRepository: UserRepositories,
    @inject(infra.familyRepositories) private readonly familyRepository: FamilyRepositories,
  ) {}
  async execute({ userId }: LeaveFamilyParams): Promise<Either<LeaveFamilyErrors, void>> {
    try {
      const user = await this.userRepository.getByExternalId(userId);

      if (!user) {
        return left(new UserNotFoundError());
      }

      if (!user.family) {
        return left(new UserNotAFamilyMemberError());
      }

      user.familyId = undefined;

      await this.userRepository.update(user);

      return right(undefined);
    } catch (error) {
      console.error(error);

      return left(new UnexpectedError());
    }
  }
}
