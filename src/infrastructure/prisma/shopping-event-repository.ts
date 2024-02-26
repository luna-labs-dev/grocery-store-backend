import { ShoppingEventMapper } from './mappers';

import { ShoppingEventRepositories } from '@/application';
import { ShoppingEvent } from '@/domain';
import { prisma } from '@/main/prisma/client';

export class PrismaShoppingEventRepository implements ShoppingEventRepositories {
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
