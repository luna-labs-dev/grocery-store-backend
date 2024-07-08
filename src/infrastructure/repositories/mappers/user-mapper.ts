import { Prisma, user } from '@prisma/client';

import { User } from '@/domain';

type UserCreatePersistence = Prisma.userCreateInput;
type UserUpdatePersistence = Prisma.userUpdateInput;

export const UserMapper = {
  toDomain: (raw: user): User => {
    return User.create(
      {
        familyId: raw.familyId ?? undefined,
        email: raw.email,
        displayName: raw.displayName,
        firebaseId: raw.firebaseId,
      },
      raw.id,
    );
  },

  toCreatePersistence: (user: User): UserCreatePersistence => {
    return {
      id: user.id,
      displayName: user.displayName,
      email: user.email,
      firebaseId: user.firebaseId,
    };
  },

  toUpdatePersistence: (user: User): UserUpdatePersistence => {
    return {
      displayName: user.displayName,
      email: user.email,
      familyMember: user.familyId
        ? {
            connect: {
              id: user.familyId,
            },
          }
        : undefined,
    };
  },
};
