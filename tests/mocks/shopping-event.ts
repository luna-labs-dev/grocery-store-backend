import { mockMarket } from './market';

import { Products } from '@/domain/entities/products';
import { ShoppingEvent } from '@/domain';

interface MockShoppingEventResult {
  id: string;
  shoppingEvent: ShoppingEvent;
  existingShoppingEvent: ShoppingEvent;
}

export const mockShoppingEvent = (id?: string): MockShoppingEventResult => {
  const user = 'some-user@email.com';

  const localId = '9ce092bd-ae15-453d-b1a1-14186e0d7d92';

  const { id: marketId, market } = mockMarket();
  const shoppingEvent = ShoppingEvent.create(
    {
      marketId,
      market,
      status: 'ONGOING',
      products: Products.create([]),
      createdAt: new Date(),
      createdBy: user,
    },
    id ?? localId,
  );

  const existingShoppingEvent = ShoppingEvent.create({
    marketId,
    market,
    status: 'ONGOING',
    products: Products.create([]),
    createdAt: new Date(),
    createdBy: user,
  });

  return {
    id: id ?? localId,
    shoppingEvent,
    existingShoppingEvent,
  };
};
