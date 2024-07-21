import { inject, injectable } from 'tsyringe';

import { GetMarketByIdRepository } from '../../contracts';

import {
  Either,
  GetMarketById,
  GetMarketByIdErrors,
  GetMarketByIdParams,
  Market,
  MarketNotFoundError,
  UnexpectedError,
  left,
  right,
} from '@/domain';
import { injection } from '@/main/di/injection-codes';

const { infra } = injection;

@injectable()
export class DbGetMarketById implements GetMarketById {
  constructor(
    @inject(infra.marketRepositories) private readonly repository: GetMarketByIdRepository,
  ) {}

  execute = async ({
    marketId,
  }: GetMarketByIdParams): Promise<Either<GetMarketByIdErrors, Market>> => {
    try {
      const market = await this.repository.getById({
        id: marketId,
      });

      if (!market) {
        return left(new MarketNotFoundError());
      }

      return right(market);
    } catch (error) {
      console.error(error);

      return left(new UnexpectedError());
    }
  };
}
