import { Prisma, family, user } from '@prisma/client';

import { Family, User } from '@/domain';
import {} from './family-mapper';

type FamilyPersistence = family & {
  owner: user;
  members: user[];
};
export type UserPersistence = user & {
  family?: FamilyPersistence | null;
};

type UserCreatePersistence = Prisma.userCreateInput;
type UserUpdatePersistence = Prisma.userUpdateInput;

export const UserMapper = {
  toDomain: (user: UserPersistence): User => {
    return User.create(
      {
        firebaseId: user.firebaseId,
        email: user.email,
        familyId: user.familyId ?? undefined,
        family: user.family
          ? Family.create(
              {
                ownerId: user.family.ownerId,
                owner: User.create(
                  {
                    firebaseId: user.family.owner.firebaseId,
                    email: user.family.owner.email,
                  },
                  user.family.owner.id,
                ),
                members: user.family.members.map((member) =>
                  User.create(
                    {
                      firebaseId: member.firebaseId,
                      email: member.email,
                    },
                    member.id,
                  ),
                ),
                name: user.family.name,
                description: user.family.description ?? undefined,
                inviteCode: user.family.inviteCode ?? undefined,
                createdAt: user.family.createdAt,
                createdBy: user.family.createdBy,
              },
              user.family.id,
            )
          : undefined,
      },

      user.id,
    );
  },

  toCreatePersistence: (user: User): UserCreatePersistence => {
    return {
      id: user.id,
      email: user.email,
      firebaseId: user.firebaseId,
    };
  },

  toUpdatePersistence: (user: User): UserUpdatePersistence => {
    return {
      email: user.email,
      family: user.familyId
        ? {
            connect: {
              id: user.familyId,
            },
          }
        : {
            disconnect: true,
          },
    };
  },
};
