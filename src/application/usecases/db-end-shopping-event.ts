import { GetShoppingEventByIdRepository, UpdateShoppingEventRepository } from '../contracts';

import {
  Either,
  EndShoppingEvent,
  EndShoppingEventErrors,
  EndShoppingEventParams,
  left,
  ShoppingEvent,
  UnexpectedError,
} from '@/domain';

type EndShoppingEventRepositories = GetShoppingEventByIdRepository & UpdateShoppingEventRepository;
export class DbEndShoppingEvent implements EndShoppingEvent {
  constructor(private readonly repository: EndShoppingEventRepositories) {}

  execute = async ({
    shoppingEventId,
  }: EndShoppingEventParams): Promise<Either<EndShoppingEventErrors, ShoppingEvent>> => {
    // Get Shopping Event by Id
    await this.repository.getById({
      shoppingEventId,
    });

    // Returns ShoppingEventNotFoundError if ShoppingEvent is undefined

    // Update ShoppingEvent object with new values

    // Update ShoppingEvent to the database

    // Returns Updated ShoppingEvent
    return await Promise.resolve(left(new UnexpectedError()));
  };
}
