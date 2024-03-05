import { Either } from '../core';
import { ShoppingEvent } from '../entities';

import { ShoppingEventNotFoundError, UnexpectedError } from './errors';

export type GetShoppingEventByIdPossibleErrors = UnexpectedError & ShoppingEventNotFoundError;

export interface GetShoppingEventByIdParams {
  shoppingEventId: string;
}

export interface GetShoppingEventById {
  execute: (
    params: GetShoppingEventByIdParams,
  ) => Promise<Either<GetShoppingEventByIdPossibleErrors, ShoppingEvent>>;
}
