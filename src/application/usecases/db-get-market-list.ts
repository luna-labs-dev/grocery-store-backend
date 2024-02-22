import { inject, injectable } from 'tsyringe';

import { GetMarketListRepository } from '../contracts';

import {
  Either,
  GetMarketList,
  GetMarketListParams,
  GetMarketListResult,
  left,
  right,
  UnexpectedError,
} from '@/domain';

@injectable()
export class DbGetMarketList implements GetMarketList {
  constructor(@inject('') private readonly repositories: GetMarketListRepository) {}

  execute = async ({
    search,
    pageIndex,
    pageSize,
    orderBy,
    orderDirection,
  }: GetMarketListParams): Promise<Either<UnexpectedError, GetMarketListResult>> => {
    try {
      // Count the Total
      const marketCount = await this.repositories.count({
        search,
      });

      // Create response object with the count
      const response: GetMarketListResult = {
        total: marketCount,
        markets: [],
      };

      if (marketCount > 0) {
        await this.repositories.getAll({
          search,
          pageIndex,
          pageSize,
          orderBy,
          orderDirection,
        });
      }

      // Fetch actual Market list only if total is greater than 0

      // -> Set list to the response.markets

      // return the response

      return right(response);
    } catch (error) {
      console.error(error);

      return left(new UnexpectedError());
    }
  };
}
