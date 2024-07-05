import { Family } from '@/domain';

export interface AddFamilyRepository {
  add: (family: Family) => Promise<void>;
}
