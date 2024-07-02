import { family, market, Prisma, product, shopping_event, user } from '@prisma/client';

import { MarketMapper } from './market-mapper';
import { FamilyMapper } from './family-mapper';

import { Market, Product, ShoppingEvent } from '@/domain';
import { Products } from '@/domain/entities/products';

type ShoppingEventPersistence = shopping_event & {
  market?: market;
  product?: product[];
  family: family & { owner: user; members: user[] };
};
type ShoppingEventCreatePersistence = Prisma.shopping_eventCreateInput;
type ShoppingEventUpdatePersistence = Prisma.shopping_eventUpdateInput;

export class ShoppingEventMapper {
  static toDomain(raw: ShoppingEventPersistence): ShoppingEvent {
    return ShoppingEvent.create(
      {
        familyId: raw.familyId,
        family: FamilyMapper.toDomain(raw.family),
        marketId: raw.marketId,
        market: MarketMapper.toDomain(raw.market as Market),
        description: raw.description ?? '',
        totalPaid: Number(raw.totalPaid ?? 0),
        wholesaleTotal: Number(raw.wholesaleTotal ?? 0),
        retailTotal: Number(raw.retailTotal ?? 0),
        status: raw.status,
        products: Products.create(
          raw.product
            ? raw.product?.map((prod) =>
                Product.create(
                  {
                    shoppingEventId: raw.id,
                    name: prod.name,
                    amount: prod.amount,
                    wholesaleMinAmount: prod.wholesaleMinAmount ?? undefined,
                    price: Number(prod.price),
                    wholesalePrice: prod.wholesalePrice ? Number(prod.wholesalePrice) : undefined,
                    addedAt: prod.addedAt,
                    addedBy: prod.addedBy,
                  },
                  prod.id,
                ),
              )
            : [],
        ),
        elapsedTime: raw.elapsedTime ?? undefined,
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
      family: {
        connect: {
          id: shoppingEvent.familyId,
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
      elapsedTime: shoppingEvent.elapsedTime ?? null,
      finishedAt: shoppingEvent.finishedAt ?? null,
    };
    return persistence;
  }
}
