import { NewMarketRepository } from '../contracts';

import {
  Either,
  left,
  Market,
  NewMarket,
  NewMarketParams,
  NewMarketResult,
  right,
  UnexpectedError,
} from '@/domain';

export class DbNewMarket implements NewMarket {
  constructor(private readonly repository: NewMarketRepository) {}
  execute = async ({
    name,
    user,
  }: NewMarketParams): Promise<Either<UnexpectedError, NewMarketResult>> => {
    try {
      const market = Market.create({
        name,
        createdAt: new Date(),
        createdBy: user,
      });

      await this.repository.create(market);

      return right({
        id: market.id,
        createdAt: market.createdAt,
      });
    } catch (error) {
      console.error(error);
      return left(new UnexpectedError());
    }
  };
}
