import { Either } from '../core';
import { ShoppingEvent, ShoppingEventStatus } from '../entities';

import { UnexpectedError } from './errors';

export interface GetShoppingEventListParams {
  status?: ShoppingEventStatus;
  period?: {
    start: Date;
    end: Date;
  };
  pageIndex: number;
  pageSize: number;
  orderBy: 'createdAt';
  orderDirection: 'desc' | 'asc';
}

type GetShoppingEventListPossibleErrors = UnexpectedError;

export interface GetMarketListResult {
  total: number;
  shoppingEvents: ShoppingEvent[];
}

export interface GetShoppingEventList {
  execute: (
    params: GetShoppingEventListParams,
  ) => Promise<Either<GetShoppingEventListPossibleErrors, GetMarketListResult>>;
}
