import { ShoppingEventMapper } from './mappers';

import { GetShoppingEventByIdRepositoryProps, ShoppingEventRepositories } from '@/application';
import { ShoppingEvent } from '@/domain';
import { prisma } from '@/main/prisma/client';

export class PrismaShoppingEventRepository implements ShoppingEventRepositories {
  getById = async ({
    shoppingEventId,
  }: GetShoppingEventByIdRepositoryProps): Promise<ShoppingEvent | undefined> => {
    const shoppingEvent = await prisma.shopping_event.findFirst({
      where: {
        id: shoppingEventId,
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
