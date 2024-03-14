import { ShoppingEvent } from '@/domain';

export interface GetShoppingEventByIdRepositoryProps {
  shoppingEventId: string;
}

export interface GetShoppingEventByIdRepository {
  getById: (params: GetShoppingEventByIdRepositoryProps) => Promise<ShoppingEvent | undefined>;
}
