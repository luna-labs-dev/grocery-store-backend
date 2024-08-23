import { Market } from '@/domain';

export interface GetMarketByCodeRepositoryParams {
  familyId: string;
  code: string;
}

export interface GetMarketByCodeRepository {
  getByCode: (params: GetMarketByCodeRepositoryParams) => Promise<Market | undefined>;
}
