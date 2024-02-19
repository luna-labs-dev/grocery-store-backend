import { market } from '@prisma/client';

import { Market } from '@/domain';

type MarketPersistence = market;

export class MarketMapper {
  static toDomain(raw: MarketPersistence | null): Market | undefined {
    if (!raw) {
      return;
    }

    return Market.create(
      {
        code: raw.code,
        name: raw.name,
        createdAt: raw.createdAt,
        createdBy: raw.createdBy,
      },
      raw.id,
    );
  }

  static toPersistence(market: Market): MarketPersistence {
    return {
      id: market.id,
      code: market.code as string,
      name: market.name,
      createdAt: market.createdAt,
      createdBy: market.createdBy,
    };
  }
}
