import { inject, injectable } from 'tsyringe';

import { GetMarketListRepository } from '../contracts';

import {
  Either,
  GetMarketList,
  GetMarketListParams,
  GetMarketListResult,
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
    await this.repositories.count({
      search,
    });
    return await Promise.resolve(
      right({
        total: 0,
        markets: [],
      }),
    );
  };
}
