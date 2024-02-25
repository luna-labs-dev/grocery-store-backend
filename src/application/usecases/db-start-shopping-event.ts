import { GetMarketByIdRepository } from '../contracts';

import {
  Either,
  left,
  MarketNotFoundError,
  ShoppingEvent,
  StartShoppingEvent,
  StartShoppingEventErrors,
  StartShoppingEventParams,
  UnexpectedError,
} from '@/domain';

export class DbStartShoppingEvent implements StartShoppingEvent {
  constructor(private readonly marketRepository: GetMarketByIdRepository) {}
  execute = async ({
    marketId,
  }: StartShoppingEventParams): Promise<Either<StartShoppingEventErrors, ShoppingEvent>> => {
    try {
      // Calls GetMarketById
      const market = await this.marketRepository.getById({
        id: marketId,
      });

      // If Market doesnt exists returns MarketNotFoundError
      if (!market) {
        return left(new MarketNotFoundError());
      }

      // Create ShoppingEvent instance

      // Calls AddShoppingEvent repository

      // Returns ShoppingEvent

      return await Promise.resolve(left(new UnexpectedError()));
    } catch (error) {
      console.error(error);

      return left(new UnexpectedError());
    }
  };
}
