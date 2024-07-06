import { UserRepositories } from '@/application';
import { User } from '@/domain';
import { prisma } from '@/main/prisma/client';
import { UserMapper } from './mappers';

export class PrismaUserRepository implements UserRepositories {
  add = async (user: User): Promise<void> => {
    await prisma.user.create({
      data: UserMapper.toCreatePersistence(user),
    });
  };

  update = async (user: User): Promise<void> => {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: UserMapper.toUpdatePersistence(user),
    });
  };

  getById = async (userId: string): Promise<User | undefined> => {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return undefined;
    }

    return UserMapper.toDomain(user);
  };
}
