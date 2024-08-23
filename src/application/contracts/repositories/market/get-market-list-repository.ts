import { Market } from '@/domain';

export interface GetMarketListRepositoryParams {
  familyId: string;
  search?: string;
  pageIndex: number;
  pageSize: number;
  orderBy: 'createdAt';
  orderDirection: 'desc' | 'asc';
}

export type CountMarketListRepositoryParams = Pick<
  GetMarketListRepositoryParams,
  'search' | 'familyId'
>;

export interface GetMarketListRepository {
  count: (params: CountMarketListRepositoryParams) => Promise<number>;
  getAll: (params: GetMarketListRepositoryParams) => Promise<Market[]>;
}
