import { Either } from '../core';
import { Market } from '../entities';

import { UnexpectedError } from './errors';

export type NewMarketErrors = UnexpectedError;

export interface NewMarketParams {
  name: string;
  user: string;
}

export interface NewMarket {
  execute: (request: NewMarketParams) => Promise<Either<NewMarketErrors, Market>>;
}
