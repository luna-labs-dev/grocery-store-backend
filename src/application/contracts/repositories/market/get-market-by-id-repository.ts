import { Market } from '@/domain';

export interface GetMarketByIdRepositoryParams {
  familyId: string;
  id: string;
}

export interface GetMarketByIdRepository {
  getById: (params: GetMarketByIdRepositoryParams) => Promise<Market | undefined>;
}
