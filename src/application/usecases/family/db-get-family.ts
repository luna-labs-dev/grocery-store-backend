import { UserInfo, UserRepositories } from '@/application/contracts';
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
import { inject, injectable } from 'tsyringe';

const { infra } = injection;

@injectable()
export class DbGetFamily implements GetFamily {
  constructor(
    @inject(infra.userRepositories) private readonly userRepository: UserRepositories,
    @inject(infra.userInfo) private readonly userinfo: UserInfo,
  ) {}

  async execute({ userId }: GetFamilyParams): Promise<Either<GetFamilyErrors, Family>> {
    try {
      const user = await this.userRepository.getByExternalId(userId);

      if (!user) {
        return left(new UserNotFoundError());
      }

      if (!user.family?.members) {
        return left(new FamilyWithoutMembersError());
      }

      for (const member of user.family.members) {
        const userInfo = await this.userinfo.getInfoByUserId(member.firebaseId);
        member.setUserInfo({
          name: userInfo.name,
          picture: userInfo.picture,
        });
      }

      const userInfo = await this.userinfo.getInfoByUserId(user.family.owner.firebaseId);

      user.family.owner.setUserInfo({
        name: userInfo.name,
        picture: userInfo.picture,
      });

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
