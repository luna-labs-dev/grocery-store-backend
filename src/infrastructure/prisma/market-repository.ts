import { MarketMapper } from './mappers/market-mapper';

import {
  GetMarketByCodeRepository,
  GetMarketByCodeRepositoryParams,
  GetMarketByIdRepository,
  GetMarketByIdRepositoryParams,
  NewMarketRepository,
  UpdateMarketRepository,
} from '@/application';
import { Market } from '@/domain';
import { prisma } from '@/main/prisma/client';

export type MarketRepositories = GetMarketByCodeRepository &
  GetMarketByIdRepository &
  NewMarketRepository &
  UpdateMarketRepository;

export class PrismaMarketRepository implements MarketRepositories {
  getById = async ({ id }: GetMarketByIdRepositoryParams): Promise<Market | undefined> => {
    const market = await prisma.market.findFirst({
      where: {
        id,
      },
    });

    return MarketMapper.toDomain(market);
  };

  getByCode = async ({ code }: GetMarketByCodeRepositoryParams): Promise<Market | undefined> => {
    const market = await prisma.market.findFirst({
      where: {
        code,
      },
    });

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
