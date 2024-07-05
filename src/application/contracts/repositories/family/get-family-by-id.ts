import { Family } from '@/domain';

export interface GetFamilyByIdRepositoryParams {
  userId: string;
  familyId: string;
}

export interface GetFamilyByIdRepository {
  getById: (params: GetFamilyByIdRepositoryParams) => Promise<Family>;
}
