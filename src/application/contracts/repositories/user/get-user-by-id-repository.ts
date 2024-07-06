import { User } from '@/domain';

export interface GetUserByIdRepository {
  getById: (userId: string) => Promise<User | undefined>;
}
