import { inject, injectable } from 'tsyringe';

import { GetMarketListRepository } from '../../contracts';

import {
  Either,
  GetMarketList,
  GetMarketListParams,
  GetMarketListResult,
  UnexpectedError,
  left,
  right,
} from '@/domain';
import { injection } from '@/main/di/injection-codes';

const { marketRepositories } = injection.infra;

@injectable()
export class DbGetMarketList implements GetMarketList {
  constructor(@inject(marketRepositories) private readonly repositories: GetMarketListRepository) {}

  execute = async ({
    familyId,
    search,
    pageIndex,
    pageSize,
    orderBy,
    orderDirection,
  }: GetMarketListParams): Promise<Either<UnexpectedError, GetMarketListResult>> => {
    try {
      const marketCount = await this.repositories.count({
        familyId,
        search,
      });

      const response: GetMarketListResult = {
        total: marketCount,
        markets: [],
      };

      if (marketCount > 0) {
        const markets = await this.repositories.getAll({
          familyId,
          search,
          pageIndex,
          pageSize,
          orderBy,
          orderDirection,
        });

        response.markets = markets;
      }

      return right(response);
    } catch (error) {
      console.error(error);

      return left(new UnexpectedError());
    }
  };
}
