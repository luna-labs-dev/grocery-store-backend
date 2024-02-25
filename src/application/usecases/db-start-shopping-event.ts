import { GetMarketByIdRepository } from '../contracts';

import {
  Either,
  left,
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
    // Calls GetMarketById
    await this.marketRepository.getById({
      id: marketId,
    });

    // If Market doesnt exists returns MarketNotFoundError

    // Create ShoppingEvent instance

    // Calls AddShoppingEvent repository

    // Returns ShoppingEvent

    return await Promise.resolve(left(new UnexpectedError()));
  };
}
