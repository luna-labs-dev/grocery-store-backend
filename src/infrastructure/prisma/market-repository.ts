import { MarketMapper } from './mappers/market-mapper';

import { GetMarketByCodeRepository, GetMarketByCodeRepositoryParams } from '@/application';
import { Market } from '@/domain';
import { prisma } from '@/main/prisma/client';

type MarketRepositories = GetMarketByCodeRepository;

export class PrismaMarketRepository implements MarketRepositories {
  getByCode = async ({ code }: GetMarketByCodeRepositoryParams): Promise<Market | undefined> => {
    const market = await prisma.market.findFirst({
      where: {
        code,
      },
    });

    return MarketMapper.toDomain(market);
  };
}
