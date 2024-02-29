import { ShoppingEventMapper } from './mappers';

import {
  CountShoppingEventListRepositoryParams,
  GetShoppingEventByIdRepositoryProps,
  GetShoppingEventListRepositoryParams,
  ShoppingEventRepositories,
} from '@/application';
import { ShoppingEvent } from '@/domain';
import { prisma } from '@/main/prisma/client';

export class PrismaShoppingEventRepository implements ShoppingEventRepositories {
  count = async ({ status, period }: CountShoppingEventListRepositoryParams): Promise<number> => {
    const count = await prisma.shopping_event.count({
      where: {
        status,
        createdAt: period && {
          lte: period.start,
          gte: period.end,
        },
      },
    });

    return count;
  };

  getAll = async ({
    status,
    period,
    pageIndex,
    pageSize,
    orderBy,
    orderDirection,
  }: GetShoppingEventListRepositoryParams): Promise<ShoppingEvent[]> => {
    const shoppingEvents = await prisma.shopping_event.findMany({
      where: {
        status,
        createdAt: period && {
          lte: period?.start,
          gte: period?.end,
        },
      },
      skip: pageIndex * pageSize,
      take: pageSize,
      orderBy: {
        [orderBy]: orderDirection,
      },
      include: {
        market: true,
      },
    });

    if (shoppingEvents.length === 0) {
      return [];
    }

    return shoppingEvents.map((shoppingEvent) => ShoppingEventMapper.toDomain(shoppingEvent));
  };

  getById = async ({
    shoppingEventId,
  }: GetShoppingEventByIdRepositoryProps): Promise<ShoppingEvent | undefined> => {
    const shoppingEvent = await prisma.shopping_event.findFirst({
      where: {
        id: shoppingEventId,
      },
      include: {
        market: true,
      },
    });

    if (!shoppingEvent) {
      return undefined;
    }

    return ShoppingEventMapper.toDomain(shoppingEvent);
  };

  add = async (shoppingEvent: ShoppingEvent): Promise<void> => {
    await prisma.shopping_event.create({
      data: ShoppingEventMapper.toCreatePersistence(shoppingEvent),
    });
  };

  update = async (shoppingEvent: ShoppingEvent): Promise<void> => {
    await prisma.shopping_event.update({
      where: {
        id: shoppingEvent.id,
        marketId: shoppingEvent.marketId,
      },
      data: ShoppingEventMapper.toUpdatePersistence(shoppingEvent),
    });
  };
}
