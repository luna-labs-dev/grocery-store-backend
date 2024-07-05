import { inject, injectable } from 'tsyringe';

import { GetShoppingEventByIdRepository, UpdateShoppingEventRepository } from '../contracts';

import {
  Either,
  EmptyCartError,
  EndShoppingEvent,
  EndShoppingEventErrors,
  EndShoppingEventParams,
  ShoppingEvent,
  ShoppingEventAlreadyEndedError,
  ShoppingEventNotFoundError,
  UnexpectedError,
  left,
  right,
} from '@/domain';
import { injection } from '@/main/di/injection-codes';

type EndShoppingEventRepositories = GetShoppingEventByIdRepository & UpdateShoppingEventRepository;

const { infra } = injection;
@injectable()
export class DbEndShoppingEvent implements EndShoppingEvent {
  constructor(
    @inject(infra.shoppingEventRepositories)
    private readonly repository: EndShoppingEventRepositories,
  ) {}

  execute = async ({
    shoppingEventId,
    familyId,
    totalPaid,
  }: EndShoppingEventParams): Promise<Either<EndShoppingEventErrors, ShoppingEvent>> => {
    try {
      // Get Shopping Event by Id
      const shoppingEvent = await this.repository.getById({
        shoppingEventId,
        familyId,
      });

      // Returns ShoppingEventNotFoundError if ShoppingEvent is undefined
      if (!shoppingEvent) {
        return left(new ShoppingEventNotFoundError());
      }

      if (shoppingEvent.status !== 'ONGOING') {
        return left(new ShoppingEventAlreadyEndedError(shoppingEvent.status, shoppingEvent.id));
      }

      if (shoppingEvent.products.getItems().length <= 0) {
        return left(new EmptyCartError());
      }

      // Update ShoppingEvent object with new values
      shoppingEvent.end(totalPaid);

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
