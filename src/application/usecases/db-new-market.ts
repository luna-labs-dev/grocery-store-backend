import { inject, injectable } from 'tsyringe';

import {
  Either,
  left,
  Market,
  MarketAlreadyExistsError,
  NewMarket,
  NewMarketErrors,
  NewMarketParams,
  right,
  UnexpectedError,
} from '@/domain';
import { GetMarketByCodeRepository, NewMarketRepository } from '@/application';
import { injection } from '@/main/di';

export type NewMarketRepositories = NewMarketRepository & GetMarketByCodeRepository;

const { infra } = injection;

@injectable()
export class DbNewMarket implements NewMarket {
  constructor(
    @inject(infra.marketRepositories) private readonly repository: NewMarketRepositories,
  ) {}

  execute = async ({ name, user }: NewMarketParams): Promise<Either<NewMarketErrors, Market>> => {
    try {
      const market = Market.create({
        name,
        createdAt: new Date(),
        createdBy: user,
      });

      const marketExists = await this.repository.getByCode({
        code: market.code as string,
      });

      if (marketExists) {
        return left(new MarketAlreadyExistsError());
      }

      await this.repository.new(market);

      return right(market);
    } catch (error) {
      console.error(error);
      return left(new UnexpectedError());
    }
  };
}
