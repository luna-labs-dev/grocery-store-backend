import { Prisma, family, user } from '@prisma/client';

import { UserMapper } from './user-mapper';

import { Family } from '@/domain';

type FamilyPersistence = family & { owner: user; members: user[] };

type FamilyUpdatePersistence = Prisma.familyUpdateInput;
type FamilyCreatePersistence = Prisma.familyCreateInput;

export const FamilyMapper = {
  toDomain: (family: FamilyPersistence): Family => {
    return Family.create(
      {
        ownerId: family.ownerId,
        owner: UserMapper.toDomain(family.owner),
        name: family.name,
        description: family.description ?? undefined,
        inviteCode: family.inviteCode ?? undefined,
        members: family.members.map((member) => UserMapper.toDomain(member)),
        createdAt: family.createdAt,
        createdBy: family.createdBy,
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
      name: family.name,
      owner: {
        connect: {
          id: family.ownerId,
        },
      },
      description: family.description,
      createdAt: family.createdAt,
      createdBy: family.createdBy,
    };
  },
};
