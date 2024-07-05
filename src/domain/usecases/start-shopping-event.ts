import { Either } from '../core';
import { ShoppingEvent } from '../entities';

import { MarketNotFoundError, UnexpectedError } from './errors';

export type StartShoppingEventErrors = UnexpectedError & MarketNotFoundError;

export interface StartShoppingEventParams {
  user: string;
  familyId: string;
  marketId: string;
}

export interface StartShoppingEvent {
  execute: (
    params: StartShoppingEventParams,
  ) => Promise<Either<StartShoppingEventErrors, ShoppingEvent>>;
}
