import {
  Either,
  left,
  Market,
  UnexpectedError,
  UpdateMarket,
  UpdateMarketErrors,
  UpdateMarketParams,
} from '@/domain';

export class DbUpdateMarket implements UpdateMarket {
  execute = async ({
    name,
    marketId,
  }: UpdateMarketParams): Promise<Either<UpdateMarketErrors, Market>> => {
    // GetMarketById
    return left(new UnexpectedError());
  };
}
