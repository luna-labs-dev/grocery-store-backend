import { Either } from '../core';
import { Market } from '../entities';

import { UnexpectedError } from './errors';

export type UpdateMarketErrors = UnexpectedError;

export interface UpdateMarketParams {
  name: string;
  marketId: string;
}

export interface UpdateMarket {
  execute: (request: UpdateMarketParams) => Promise<Either<UpdateMarketErrors, Market>>;
}
