import {
  FamilyRepositories,
  GetFamilyByIdRepositoryParams,
  GetFamilyByInviteCodeRepositoryParams,
} from '@/application';
import { Family } from '@/domain';
import { prisma } from '@/main/prisma/client';
import { FamilyMapper } from './mappers';

export class PrismaFamilyRepository implements FamilyRepositories {
  add = async (family: Family): Promise<void> => {
    await prisma.family.create({
      data: FamilyMapper.toCreatePersistence(family),
    });
  };

  update = async (family: Family): Promise<void> => {
    await prisma.family.update({
      where: {
        id: family.id,
      },
      data: FamilyMapper.toUpdatePersistence(family),
    });
  };

  getById = async (params: GetFamilyByIdRepositoryParams): Promise<Family | undefined> => {
    const family = await prisma.family.findFirst({
      where: {
        id: params.familyId,
      },
      include: {
        owner: true,
        members: true,
      },
    });

    if (!family) {
      return undefined;
    }

    return FamilyMapper.toDomain(family);
  };

  getByInviteCode = async ({
    inviteCode,
  }: GetFamilyByInviteCodeRepositoryParams): Promise<Family | undefined> => {
    const family = await prisma.family.findFirst({
      where: {
        inviteCode: inviteCode,
      },
      include: {
        owner: true,
        members: true,
      },
    });

    if (!family) {
      return undefined;
    }

    return FamilyMapper.toDomain(family);
  };
}
