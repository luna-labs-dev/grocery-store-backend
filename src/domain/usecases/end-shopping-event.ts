import { Either } from '../core';
import { ShoppingEvent } from '../entities';

import { ShoppingEventNotFoundError, UnexpectedError } from './errors';

export interface EndShoppingEventParams {
  shoppingEventId: string;
}

export type EndShoppingEventErrors = UnexpectedError & ShoppingEventNotFoundError;

export interface EndShoppingEvent {
  execute: (
    params: EndShoppingEventParams,
  ) => Promise<Either<EndShoppingEventErrors, ShoppingEvent>>;
}
