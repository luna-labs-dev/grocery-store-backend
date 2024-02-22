import { MarketMapper } from './mappers/market-mapper';

import {
  GetMarketByCodeRepositoryParams,
  GetMarketByIdRepositoryParams,
  GetMarketListRepositoryParams,
  MarketRepositories,
} from '@/application';
import { Market } from '@/domain';
import { prisma } from '@/main/prisma/client';

export class PrismaMarketRepository implements MarketRepositories {
  getAll = async ({
    search,
    pageIndex,
    pageSize,
    orderBy,
    orderDirection,
  }: GetMarketListRepositoryParams): Promise<Market[]> => {
    const markets = await prisma.market.findMany({
      where: {
        name: {
          contains: search,
        },
      },
      skip: pageIndex * pageSize,
      take: pageSize,
      orderBy: {
        [orderBy]: orderDirection,
      },
    });

    if (markets.length === 0) {
      return [];
    }

    return markets.map((market) => MarketMapper.toDomain(market));
  };

  getById = async ({ id }: GetMarketByIdRepositoryParams): Promise<Market | undefined> => {
    const market = await prisma.market.findFirst({
      where: {
        id,
      },
    });

    if (!market) {
      return;
    }

    return MarketMapper.toDomain(market);
  };

  getByCode = async ({ code }: GetMarketByCodeRepositoryParams): Promise<Market | undefined> => {
    const market = await prisma.market.findFirst({
      where: {
        code,
      },
    });

    if (!market) {
      return;
    }

    return MarketMapper.toDomain(market);
  };

  new = async (market: Market): Promise<void> => {
    await prisma.market.create({
      data: MarketMapper.toPersistence(market),
    });
  };

  update = async (market: Market): Promise<void> => {
    await prisma.market.update({
      where: {
        id: market.id,
      },
      data: MarketMapper.toPersistence(market),
    });
  };
}
