import { Either } from '../../core';
import { Market } from '../../entities';

import { UnexpectedError } from '../errors';

export interface GetMarketListParams {
  familyId: string;
  search?: string;
  pageIndex: number;
  pageSize: number;
  orderBy: 'createdAt';
  orderDirection: 'desc' | 'asc';
}

type GetMarketListPossibleErrors = UnexpectedError;

export interface GetMarketListResult {
  total: number;
  markets: Market[];
}

export interface GetMarketList {
  execute: (
    params: GetMarketListParams,
  ) => Promise<Either<GetMarketListPossibleErrors, GetMarketListResult>>;
}
