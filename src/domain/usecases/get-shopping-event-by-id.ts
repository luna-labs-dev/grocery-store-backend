import { Either } from '../core';
import { ShoppingEvent } from '../entities';

import { ShoppingEventNotFoundError, UnexpectedError } from './errors';

export type GetShoppingEventByIdErrors = UnexpectedError | ShoppingEventNotFoundError;

export interface GetShoppingEventByIdParams {
  familyId: string;
  shoppingEventId: string;
}

export interface GetShoppingEventById {
  execute: (
    params: GetShoppingEventByIdParams,
  ) => Promise<Either<GetShoppingEventByIdErrors, ShoppingEvent>>;
}
