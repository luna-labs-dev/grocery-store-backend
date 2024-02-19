import {
  Either,
  left,
  Market,
  MarketAlreadyExistsError,
  NewMarket,
  NewMarketErrors,
  NewMarketParams,
  NewMarketResult,
  right,
  UnexpectedError,
} from '@/domain';
import { GetMarketByCodeRepository, NewMarketRepository } from '@/application';

export type NewMarketRepositories = NewMarketRepository & GetMarketByCodeRepository;

export class DbNewMarket implements NewMarket {
  constructor(private readonly repository: NewMarketRepositories) {}
  execute = async ({
    name,
    user,
  }: NewMarketParams): Promise<Either<NewMarketErrors, NewMarketResult>> => {
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
