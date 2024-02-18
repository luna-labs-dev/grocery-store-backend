import { Either } from '../core';

import { UnexpectedError } from './errors';

export type NewMarketErrors = UnexpectedError;

export interface NewMarketParams {
  name: string;
}

export interface NewMarketResult {
  id: string;
  createdAt: Date;
}

export interface NewMarket {
  execute: (request: NewMarketParams) => Promise<Either<NewMarketErrors, NewMarketResult>>;
}
