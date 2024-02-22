import { inject, injectable } from 'tsyringe';

import { GetMarketListRepository } from '../contracts';

import {
  Either,
  GetMarketList,
  GetMarketListParams,
  GetMarketListResult,
  left,
  Market,
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
      const marketCount = await this.repositories.count({
        search,
      });

      const response: GetMarketListResult = {
        total: marketCount,
        markets: [],
      };

      if (!marketCount) {
        return right(response);
      }

      return await Promise.resolve(
        right({
          total: 1,
          markets: [
            Market.create({
              name: 'Assai',
              createdAt: new Date(),
              createdBy: 'some@email.com',
            }),
          ],
        }),
      );
    } catch (error) {
      console.error(error);

      return left(new UnexpectedError());
    }
  };
}
