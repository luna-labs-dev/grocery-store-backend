import { UserRepositories } from '@/application';
import { Either, GetUser, GetUserErrors, GetUserParams, User, right } from '@/domain';
import { injection } from '@/main/di/injection-codes';
import { clerkClient } from '@clerk/express';

import { inject, injectable } from 'tsyringe';

const { infra } = injection;

@injectable()
export class DbGetUser implements GetUser {
  constructor(@inject(infra.userRepositories) private readonly userRepository: UserRepositories) {}

  execute = async ({ externalId }: GetUserParams): Promise<Either<GetUserErrors, User>> => {
    let user = await this.userRepository.getByExternalId(externalId);

    if (!user) {
      const clerkUser = await clerkClient.users.getUser(externalId);

      user = User.create({
        email: clerkUser.emailAddresses[0].emailAddress,
        name: clerkUser.fullName ?? '',
        picture: clerkUser.imageUrl,
        externalId: externalId,
      });

      await this.userRepository.add(user);
    }

    return right(user);
  };
}
