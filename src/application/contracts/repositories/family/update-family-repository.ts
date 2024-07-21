import { Family } from '@/domain';

export interface UpdateFamilyRepository {
  update: (family: Family) => Promise<void>;
}
