import { Either } from '../core';
import { ShoppingEvent } from '../entities';

import { UnexpectedError } from './errors';

export interface EndShoppingEventParams {
  shoppingEventId: string;
}

export type EndShoppingEventErrors = UnexpectedError;

export interface EndShoppingEvent {
  execute: (
    params: EndShoppingEventParams,
  ) => Promise<Either<EndShoppingEventErrors, ShoppingEvent>>;
}
