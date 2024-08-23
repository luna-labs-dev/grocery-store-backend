import { MarketMapper } from './mappers/market-mapper';

import {
  CountMarketListRepositoryParams,
  GetMarketByCodeRepositoryParams,
  GetMarketByIdRepositoryParams,
  GetMarketListRepositoryParams,
  MarketRepositories,
} from '@/application';
import { Market } from '@/domain';
import { prisma } from '@/main/prisma/client';

export class PrismaMarketRepository implements MarketRepositories {
  count = async ({ familyId, search }: CountMarketListRepositoryParams): Promise<number> => {
    const count = await prisma.market.count({
      where: {
        familyId,
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
    });

    return count;
  };

  getAll = async ({
    familyId,
    search,
    pageIndex,
    pageSize,
    orderBy,
    orderDirection,
  }: GetMarketListRepositoryParams): Promise<Market[]> => {
    const markets = await prisma.market.findMany({
      where: {
        familyId,
        name: {
          contains: search,
          mode: 'insensitive',
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

  getById = async ({
    familyId,
    id,
  }: GetMarketByIdRepositoryParams): Promise<Market | undefined> => {
    const market = await prisma.market.findFirst({
      where: {
        familyId,
        id,
      },
    });

    if (!market) {
      return;
    }

    return MarketMapper.toDomain(market);
  };

  getByCode = async ({
    familyId,
    code,
  }: GetMarketByCodeRepositoryParams): Promise<Market | undefined> => {
    const market = await prisma.market.findFirst({
      where: {
        familyId,
        code,
      },
    });

    if (!market) {
      return;
    }

    return MarketMapper.toDomain(market);
  };

  add = async (market: Market): Promise<void> => {
    await prisma.market.create({
      data: MarketMapper.toPersistence(market),
    });
  };

  update = async (market: Market): Promise<void> => {
    await prisma.market.update({
      where: {
        familyId: market.familyId,
        id: market.id,
      },
      data: MarketMapper.toPersistence(market),
    });
  };
}
