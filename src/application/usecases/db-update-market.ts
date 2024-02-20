import { inject, injectable } from 'tsyringe';

import { GetMarketByIdRepository, UpdateMarketRepository } from '../contracts';

import {
  Either,
  left,
  Market,
  MarketNotFoundError,
  right,
  UnexpectedError,
  UpdateMarket,
  UpdateMarketErrors,
  UpdateMarketParams,
} from '@/domain';
import { injection } from '@/main/di/injection-codes';

export type UpdateMarketRepositories = GetMarketByIdRepository & UpdateMarketRepository;

const { infra } = injection;
@injectable()
export class DbUpdateMarket implements UpdateMarket {
  constructor(
    @inject(infra.marketRepositories) private readonly repositories: UpdateMarketRepositories,
  ) {}

  execute = async ({
    name,
    marketId,
  }: UpdateMarketParams): Promise<Either<UpdateMarketErrors, Market>> => {
    try {
      // GetMarketById
      const market = await this.repositories.getById({ id: marketId });

      // Return Market not found if No market is returned
      if (!market) {
        return left(new MarketNotFoundError(marketId));
      }

      // Update Market Entity with new values
      market.update({ name });

      // Update Market in the Database
      await this.repositories.update(market);

      // Return Updated Market
      return right(market);
    } catch (error) {
      console.error(error);

      return left(new UnexpectedError());
    }
  };
}
