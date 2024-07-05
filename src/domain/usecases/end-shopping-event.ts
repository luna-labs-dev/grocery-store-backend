import { Either } from '../core';
import { ShoppingEvent } from '../entities';

import {
  EmptyCartError,
  ShoppingEventAlreadyEndedError,
  ShoppingEventNotFoundError,
  UnexpectedError,
} from './errors';

export interface EndShoppingEventParams {
  shoppingEventId: string;
  familyId: string;
  totalPaid: number;
}

export type EndShoppingEventErrors =
  | UnexpectedError
  | ShoppingEventNotFoundError
  | ShoppingEventAlreadyEndedError
  | EmptyCartError;

export interface EndShoppingEvent {
  execute: (
    params: EndShoppingEventParams,
  ) => Promise<Either<EndShoppingEventErrors, ShoppingEvent>>;
}
