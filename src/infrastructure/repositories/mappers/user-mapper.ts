import { user } from '@prisma/client';

import { User } from '@/domain';

export const UserMapper = {
  toDomain: (raw: user): User => {
    return User.create(
      {
        familyId: raw.familyId,
        email: raw.email,
        displayName: raw.displayName,
        firebaseId: raw.firebaseId,
      },
      raw.id,
    );
  },
};
