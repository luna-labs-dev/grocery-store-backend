import { GetShoppingEventByIdRepository } from '../contracts';

import {
  Either,
  GetShoppingEventById,
  GetShoppingEventByIdParams,
  GetShoppingEventByIdPossibleErrors,
  left,
  right,
  ShoppingEvent,
  ShoppingEventNotFoundError,
  UnexpectedError,
} from '@/domain';

export class DbGetShoppingEventById implements GetShoppingEventById {
  constructor(private readonly repository: GetShoppingEventByIdRepository) {}

  execute = async ({
    shoppingEventId,
  }: GetShoppingEventByIdParams): Promise<
    Either<GetShoppingEventByIdPossibleErrors, ShoppingEvent>
  > => {
    try {
      const shoppingEvent = await this.repository.getById({
        shoppingEventId,
      });

      if (!shoppingEvent) {
        return left(new ShoppingEventNotFoundError());
      }

      return right(shoppingEvent);
    } catch (error) {
      console.error(error);

      return left(new UnexpectedError());
    }
  };
}
