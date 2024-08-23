import { Either } from '../../core';
import { Market } from '../../entities';

import { MarketNotFoundError, UnexpectedError } from '../errors';

export type UpdateMarketErrors = UnexpectedError & MarketNotFoundError;

export interface UpdateMarketParams {
  name: string;
  familyId: string;
  marketId: string;
}

export interface UpdateMarket {
  execute: (request: UpdateMarketParams) => Promise<Either<UpdateMarketErrors, Market>>;
}
