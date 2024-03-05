import { inject, injectable } from 'tsyringe';

import { AddShoppingEventRepository, GetMarketByIdRepository } from '../contracts';

import {
  Either,
  left,
  MarketNotFoundError,
  right,
  ShoppingEvent,
  StartShoppingEvent,
  StartShoppingEventErrors,
  StartShoppingEventParams,
  UnexpectedError,
} from '@/domain';
import { injection } from '@/main/di/injection-codes';

const { infra } = injection;
@injectable()
export class DbStartShoppingEvent implements StartShoppingEvent {
  constructor(
    @inject(infra.marketRepositories) private readonly marketRepository: GetMarketByIdRepository,
    @inject(infra.shoppingEventRepositories)
    private readonly shoppingEventRepository: AddShoppingEventRepository,
  ) {}

  execute = async ({
    user,
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
      const shoppingEvent = ShoppingEvent.create({
        marketId,
        market,
        status: 'ONGOING',
        createdAt: new Date(),
        createdBy: user,
        products: [],
      });

      // Calls AddShoppingEvent repository

      await this.shoppingEventRepository.add(shoppingEvent);

      // Returns ShoppingEvent
      return right(shoppingEvent);
    } catch (error) {
      console.error(error);

      return left(new UnexpectedError());
    }
  };
}
