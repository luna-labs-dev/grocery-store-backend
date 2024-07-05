import { inject, injectable } from 'tsyringe';

import { GetShoppingEventByIdRepository } from '../contracts';

import {
  Either,
  GetShoppingEventById,
  GetShoppingEventByIdErrors,
  GetShoppingEventByIdParams,
  ShoppingEvent,
  ShoppingEventNotFoundError,
  UnexpectedError,
  left,
  right,
} from '@/domain';
import { injection } from '@/main/di/injection-codes';

const { infra } = injection;

@injectable()
export class DbGetShoppingEventById implements GetShoppingEventById {
  constructor(
    @inject(infra.shoppingEventRepositories)
    private readonly repository: GetShoppingEventByIdRepository,
  ) {}

  execute = async ({
    familyId,
    shoppingEventId,
  }: GetShoppingEventByIdParams): Promise<Either<GetShoppingEventByIdErrors, ShoppingEvent>> => {
    try {
      const shoppingEvent = await this.repository.getById({
        shoppingEventId,
        familyId,
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
