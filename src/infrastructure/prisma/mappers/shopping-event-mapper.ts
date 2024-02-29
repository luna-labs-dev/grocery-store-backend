import { market, Prisma, shopping_event } from '@prisma/client';

import { MarketMapper } from './market-mapper';

import { Market, ShoppingEvent } from '@/domain';

type ShoppingEventPersistence = shopping_event & { market?: market };
type ShoppingEventCreatePersistence = Prisma.shopping_eventCreateInput;
type ShoppingEventUpdatePersistence = Prisma.shopping_eventUpdateInput;

export class ShoppingEventMapper {
  static toDomain(raw: ShoppingEventPersistence): ShoppingEvent {
    return ShoppingEvent.create(
      {
        marketId: raw.marketId,
        market: MarketMapper.toDomain(raw.market as Market),
        description: raw.description ?? '',
        totalPaid: Number(raw.totalPaid ?? 0),
        wholesaleTotal: Number(raw.wholesaleTotal ?? 0),
        retailTotal: Number(raw.retailTotal ?? 0),
        status: raw.status,
        createdAt: raw.createdAt,
        finishedAt: raw.finishedAt ?? undefined,
        createdBy: raw.createdBy,
      },
      raw.id,
    );
  }

  static toCreatePersistence(shoppingEvent: ShoppingEvent): ShoppingEventCreatePersistence {
    const persistence: ShoppingEventCreatePersistence = {
      id: shoppingEvent.id,
      market: {
        connect: {
          id: shoppingEvent.marketId,
        },
      },
      description: shoppingEvent.description ?? null,
      totalPaid: new Prisma.Decimal(shoppingEvent.totalPaid ?? 0),
      wholesaleTotal: new Prisma.Decimal(shoppingEvent.wholesaleTotal ?? 0),
      retailTotal: new Prisma.Decimal(shoppingEvent.retailTotal ?? 0),
      status: shoppingEvent.status,
      createdAt: shoppingEvent.createdAt,
      finishedAt: shoppingEvent.finishedAt ?? null,
      createdBy: shoppingEvent.createdBy,
    };
    return persistence;
  }

  static toUpdatePersistence(shoppingEvent: ShoppingEvent): ShoppingEventUpdatePersistence {
    const persistence: ShoppingEventUpdatePersistence = {
      description: shoppingEvent.description ?? null,
      totalPaid: new Prisma.Decimal(shoppingEvent.totalPaid ?? 0),
      wholesaleTotal: new Prisma.Decimal(shoppingEvent.wholesaleTotal ?? 0),
      retailTotal: new Prisma.Decimal(shoppingEvent.retailTotal ?? 0),
      status: shoppingEvent.status,
      finishedAt: shoppingEvent.finishedAt ?? null,
    };
    return persistence;
  }
}
