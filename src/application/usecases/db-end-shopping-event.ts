import { GetShoppingEventByIdRepository, UpdateShoppingEventRepository } from '../contracts';

import {
  Either,
  EndShoppingEvent,
  EndShoppingEventErrors,
  EndShoppingEventParams,
  left,
  right,
  ShoppingEvent,
  ShoppingEventNotFoundError,
  UnexpectedError,
} from '@/domain';

type EndShoppingEventRepositories = GetShoppingEventByIdRepository & UpdateShoppingEventRepository;
export class DbEndShoppingEvent implements EndShoppingEvent {
  constructor(private readonly repository: EndShoppingEventRepositories) {}

  execute = async ({
    shoppingEventId,
  }: EndShoppingEventParams): Promise<Either<EndShoppingEventErrors, ShoppingEvent>> => {
    try {
      // Get Shopping Event by Id
      const shoppingEvent = await this.repository.getById({
        shoppingEventId,
      });

      // Returns ShoppingEventNotFoundError if ShoppingEvent is undefined
      if (!shoppingEvent) {
        return left(new ShoppingEventNotFoundError());
      }

      // Update ShoppingEvent object with new values
      shoppingEvent.end();

      // Update ShoppingEvent to the database
      await this.repository.update(shoppingEvent);

      // Returns Updated ShoppingEvent
      return right(shoppingEvent);
    } catch (error) {
      console.error(error);

      return left(new UnexpectedError());
    }
  };
}
