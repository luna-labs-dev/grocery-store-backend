import { inject, injectable } from 'tsyringe';

import { ShoppingEventMapper } from './mappers';

import {
  CountShoppingEventListRepositoryParams,
  GetShoppingEventByIdRepositoryProps,
  GetShoppingEventListRepositoryParams,
  ProductRepositories,
  ShoppingEventRepositories,
} from '@/application';
import { ShoppingEvent } from '@/domain';
import { injection } from '@/main/di/injection-codes';
import { prisma } from '@/main/prisma/client';

const { infra } = injection;
@injectable()
export class PrismaShoppingEventRepository implements ShoppingEventRepositories {
  constructor(
    @inject(infra.productRepositories) private readonly productRepository: ProductRepositories,
  ) {}

  count = async ({ status, period }: CountShoppingEventListRepositoryParams): Promise<number> => {
    const count = await prisma.shopping_event.count({
      where: {
        status,
        createdAt: period && {
          gte: period.start,
          lte: period.end,
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
          gte: period.start,
          lte: period.end,
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
        product: true,
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

    const newProducts = shoppingEvent.products.getNewItems();
    if (newProducts.length > 0) {
      const promisses = newProducts.map(async (prod) => {
        await this.productRepository.add(prod);
      });

      await Promise.allSettled(promisses);
    }
  };
}
