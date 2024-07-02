import { family, user } from '@prisma/client';

import { UserMapper } from './user-mapper';

import { Family } from '@/domain';

type FamilyPersistence = family & { owner: user; members: user[] };

export class FamilyMapper {
  static toDomain(family: FamilyPersistence): Family {
    return Family.create(
      {
        ownerId: family.ownerId,
        owner: UserMapper.toDomain(family.owner),
        name: family.name,
        description: family.description ?? undefined,
        inviteCode: family.inviteCode ?? undefined,
        users: family.members.map((member) => UserMapper.toDomain(member)),
      },
      family.id,
    );
  }
}
