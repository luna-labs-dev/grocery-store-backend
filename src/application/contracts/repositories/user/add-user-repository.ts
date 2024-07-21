import { User } from '@/domain';

export interface AddUserRepository {
  add: (user: User) => Promise<void>;
}
