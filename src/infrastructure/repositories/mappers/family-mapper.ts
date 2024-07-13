import { Prisma, family, user } from '@prisma/client';

import { Family, User } from '@/domain';

type UserPersistence = user & {
  family: family | null;
};
type FamilyPersistence = family & {
  owner: UserPersistence;
  members: UserPersistence[];
};
type FamilyUpdatePersistence = Prisma.familyUpdateInput;
type FamilyCreatePersistence = Prisma.familyCreateInput;

export const FamilyMapper = {
  toDomain: (family: FamilyPersistence): Family => {
    console.log(family);
    return Family.create(
      {
        ownerId: family.ownerId,
        owner: User.create(
          {
            firebaseId: family.owner.firebaseId,
            email: family.owner.email,
            displayName: family.owner.displayName,
          },
          family.owner.id,
        ),
        name: family.name,
        description: family.description ?? undefined,
        inviteCode: family.inviteCode ?? undefined,
        createdAt: new Date(),
        createdBy: family.createdBy,
        members: family.members.map((m) =>
          User.create(
            {
              firebaseId: m.firebaseId,
              email: m.email,
              displayName: m.displayName,
            },
            m.id,
          ),
        ),
      },
      family.id,
    );
  },

  toUpdatePersistence: (family: Family): FamilyUpdatePersistence => {
    return {
      id: family.id,
      name: family.name,
      description: family.description ?? null,
      inviteCode: family.inviteCode ?? null,
      owner: {
        connect: {
          id: family.ownerId,
        },
      },
    };
  },

  toCreatePersistence: (family: Family): FamilyCreatePersistence => {
    return {
      id: family.id,
      name: family.name,
      owner: {
        connect: {
          id: family.ownerId,
        },
      },
      description: family.description,
      inviteCode: family.inviteCode,
      createdAt: family.createdAt,
      createdBy: family.createdBy,
    };
  },
};
