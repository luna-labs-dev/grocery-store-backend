import {
  Either,
  EndShoppingEvent,
  EndShoppingEventErrors,
  EndShoppingEventParams,
  left,
  ShoppingEvent,
  UnexpectedError,
} from '@/domain';

export class DbEndShoppingEvent implements EndShoppingEvent {
  execute = async ({
    shoppingEventId,
  }: EndShoppingEventParams): Promise<Either<EndShoppingEventErrors, ShoppingEvent>> => {
    // Get Shopping Event by Id

    // Returns ShoppingEventNotFoundError if ShoppingEvent is undefined

    // Update ShoppingEvent object with new values

    // Update ShoppingEvent to the database

    // Returns Updated ShoppingEvent
    return await Promise.resolve(left(new UnexpectedError()));
  };
}
