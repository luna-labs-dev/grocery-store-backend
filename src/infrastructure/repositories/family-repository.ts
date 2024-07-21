import {
  FamilyRepositories,
  GetFamilyByIdRepositoryParams,
  GetFamilyByInviteCodeRepositoryParams,
  UpdateUserRepository,
  getMappedPrismaError,
} from '@/application';
import { Either, Family, left, right } from '@/domain';
import { injection } from '@/main/di/injection-codes';
import { prisma } from '@/main/prisma/client';
import { inject, injectable } from 'tsyringe';

import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { FamilyMapper } from './mappers';

const { infra } = injection;

@injectable()
export class PrismaFamilyRepository implements FamilyRepositories {
  constructor(
    @inject(infra.userRepositories) private readonly userRepositories: UpdateUserRepository,
  ) {}

  add = async (family: Family): Promise<Either<void, void>> => {
    try {
      await prisma.family.create({
        data: FamilyMapper.toCreatePersistence(family),
      });

      await this.userRepositories.update(family.owner);

      return right(undefined);
    } catch (error) {
      const typedError = error as PrismaClientKnownRequestError;

      const mappedError = getMappedPrismaError(typedError.code);
      if (mappedError === 'UNMAPPED') {
        throw error;
      }

      console.error({
        message: typedError.message,
        context: typedError.meta,
      });
      return left(undefined);
    }
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
        owner: {
          include: {
            family: true,
            ownedFamily: true,
          },
        },
        members: {
          include: {
            family: true,
            ownedFamily: true,
          },
        },
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
        owner: {
          include: {
            family: true,
            ownedFamily: true,
          },
        },
        members: {
          include: {
            family: true,
            ownedFamily: true,
          },
        },
      },
    });

    if (!family) {
      return undefined;
    }

    return FamilyMapper.toDomain(family);
  };
}
