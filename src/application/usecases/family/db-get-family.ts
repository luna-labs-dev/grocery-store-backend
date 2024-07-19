import { UserRepositories } from '@/application/contracts';
import {
  Either,
  Family,
  GetFamily,
  GetFamilyErrors,
  GetFamilyParams,
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
export class DbGetFamily implements GetFamily {
  constructor(@inject(infra.userRepositories) private readonly userRepository: UserRepositories) {}

  async execute({ userId }: GetFamilyParams): Promise<Either<GetFamilyErrors, Family>> {
    try {
      const user = await this.userRepository.getByExternalId(userId);

      if (!user) {
        return left(new UserNotFoundError());
      }

      if (!user.family) {
        return left(new UserNotAFamilyMemberError());
      }

      return right(user.family);
    } catch (error) {
      console.error(error);

      return left(new UnexpectedError());
    }
  }
}
