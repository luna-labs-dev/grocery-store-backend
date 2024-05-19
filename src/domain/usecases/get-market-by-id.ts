import { Either } from '../core';
import { Market } from '../entities';

import { MarketNotFoundError, UnexpectedError } from './errors';

export type GetMarketByIdErrors = UnexpectedError | MarketNotFoundError;

export interface GetMarketByIdParams {
  marketId: string;
}
export interface GetMarketById {
  execute: (params: GetMarketByIdParams) => Promise<Either<GetMarketByIdErrors, Market>>;
}
