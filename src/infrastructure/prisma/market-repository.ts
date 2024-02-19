import { MarketMapper } from './mappers/market-mapper';

import {
  GetMarketByCodeRepository,
  GetMarketByCodeRepositoryParams,
  NewMarketRepository,
} from '@/application';
import { Market } from '@/domain';
import { prisma } from '@/main/prisma/client';

export type MarketRepositories = GetMarketByCodeRepository & NewMarketRepository;

export class PrismaMarketRepository implements MarketRepositories {
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
}
