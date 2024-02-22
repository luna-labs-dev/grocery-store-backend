import { Market } from '@/domain';

export interface GetMarketListRepositoryParams {
  search?: string;
  pageIndex: number;
  pageSize: number;
  orderBy: 'createdAt';
  orderDirection: 'desc' | 'asc';
}

export interface GetMarketListRepository {
  getAll: (params: GetMarketListRepositoryParams) => Promise<Market[]>;
}
