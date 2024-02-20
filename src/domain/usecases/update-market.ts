import { Either } from '../core';
import { Market } from '../entities';

import { UnexpectedError } from './errors';

export type UpdateMarketErrors = UnexpectedError;

export interface NewMarketParams {
  name: string;
}

export interface UpdateMarket {
  execute: (request: NewMarketParams) => Promise<Either<UpdateMarketErrors, Market>>;
}
