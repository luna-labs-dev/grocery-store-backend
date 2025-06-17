import { UserRepositories } from '@/application/contracts';
import {
  Either,
  Family,
  FamilyWithoutMembersError,
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
import { clerkClient } from '@clerk/express';
import { inject, injectable } from 'tsyringe';

const { infra } = injection;

@injectable()
export class DbGetFamily implements GetFamily {
  constructor(
    @inject(infra.userRepositories) private readonly userRepository: UserRepositories,
    // @inject(infra.userInfo) private readonly userinfo: UserInfo,
  ) {}

  async execute({ userId }: GetFamilyParams): Promise<Either<GetFamilyErrors, Family>> {
    try {
      const user = await this.userRepository.getByExternalId(userId);

      if (!user) {
        return left(new UserNotFoundError());
      }

      if (!user.family) {
        return left(new UserNotAFamilyMemberError());
      }

      if (!user.family.members) {
        return left(new FamilyWithoutMembersError());
      }

      for (const member of user.family.members) {
        const userInfo = await clerkClient.users.getUser(member.externalId);

        member.setUserInfo({
          name: userInfo.fullName ?? '',
          picture: userInfo.imageUrl,
        });
      }

      const userInfo = await clerkClient.users.getUser(user.externalId);

      user.family.owner.setUserInfo({
        name: userInfo.fullName ?? '',
        picture: userInfo.imageUrl,
      });

      return right(user.family);
    } catch (error) {
      console.error(error);

      return left(new UnexpectedError());
    }
  }
}
