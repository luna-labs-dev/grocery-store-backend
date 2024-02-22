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
      await this.repositories.count({
        search,
      });
      return await Promise.resolve(
        right({
          total: 0,
          markets: [],
        }),
      );
    } catch (error) {
      console.error(error);

      return left(new UnexpectedError());
    }
  };
}
