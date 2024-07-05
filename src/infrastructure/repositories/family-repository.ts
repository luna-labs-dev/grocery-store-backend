import { FamilyRepositories, GetFamilyByIdRepositoryParams } from '@/application';
import { Family } from '@/domain';
import { prisma } from '@/main/prisma/client';

export class PrismaFamilyRepository implements FamilyRepositories {
  add = async (family: Family): Promise<void> => {
    await prisma.family.create({
      data: {
        name: family.name,
        owner: {
          connect: {
            id: family.ownerId,
          },
        },
        description: family.description,
        createdAt: family.createdAt,
        createdBy: family.createdBy,
      },
    });
  };
  getById = async (params: GetFamilyByIdRepositoryParams): Promise<Family> => {
    throw new Error('Method not implemented.');
  };
  update = async (family: Family): Promise<void> => {};
}
