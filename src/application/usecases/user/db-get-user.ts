import { UserRepositories } from '@/application';
import { Either, GetUser, GetUserErrors, GetUserParams, User, right } from '@/domain';
import { injection } from '@/main/di/injection-codes';

import { inject, injectable } from 'tsyringe';

const { infra } = injection;

@injectable()
export class DbGetUser implements GetUser {
  constructor(@inject(infra.userRepositories) private readonly userRepository: UserRepositories) {}

  execute = async ({ externalId }: GetUserParams): Promise<Either<GetUserErrors, User>> => {
    let user = await this.userRepository.getByExternalId(externalId);

    if (!user) {
      user = User.create({
        email: '',
        name: '',
        picture: '',
        externalId: externalId,
      });

      await this.userRepository.add(user);
    }

    return right(user);
  };
}
