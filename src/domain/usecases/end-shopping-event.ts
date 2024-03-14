import { Either } from '../core';
import { ShoppingEvent } from '../entities';

import {
  ShoppingEventAlreadyEndedError,
  ShoppingEventNotFoundError,
  UnexpectedError,
} from './errors';

export interface EndShoppingEventParams {
  shoppingEventId: string;
}

export type EndShoppingEventErrors =
  | UnexpectedError
  | ShoppingEventNotFoundError
  | ShoppingEventAlreadyEndedError;

export interface EndShoppingEvent {
  execute: (
    params: EndShoppingEventParams,
  ) => Promise<Either<EndShoppingEventErrors, ShoppingEvent>>;
}
