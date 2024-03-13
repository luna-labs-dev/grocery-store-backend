import { Either } from '../core';
import { Market } from '../entities';

import { UnexpectedError } from './errors';

export type AddMarketErrors = UnexpectedError;

export interface AddMarketParams {
  marketName: string;
  user: string;
}

export interface AddMarket {
  execute: (request: AddMarketParams) => Promise<Either<AddMarketErrors, Market>>;
}
