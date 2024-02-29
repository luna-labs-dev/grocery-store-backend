import { ShoppingEvent } from '@/domain';

export interface GetShoppingEventListRepositoryParams {
  search?: string;
  pageIndex: number;
  pageSize: number;
  orderBy: 'createdAt';
  orderDirection: 'desc' | 'asc';
}

export type CountShoppingEventListRepositoryParams = Pick<
  GetShoppingEventListRepositoryParams,
  'search'
>;

export interface GetShoppingEventListRepository {
  count: (params: CountShoppingEventListRepositoryParams) => Promise<number>;
  getAll: (params: GetShoppingEventListRepositoryParams) => Promise<ShoppingEvent[]>;
}
