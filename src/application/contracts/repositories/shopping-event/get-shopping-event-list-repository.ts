import { ShoppingEvent, ShoppingEventStatus } from '@/domain';

export interface GetShoppingEventListRepositoryParams {
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

export type CountShoppingEventListRepositoryParams = Pick<
  GetShoppingEventListRepositoryParams,
  'status' | 'period'
>;

export interface GetShoppingEventListRepository {
  count: (params: CountShoppingEventListRepositoryParams) => Promise<number>;
  getAll: (params: GetShoppingEventListRepositoryParams) => Promise<ShoppingEvent[]>;
}
