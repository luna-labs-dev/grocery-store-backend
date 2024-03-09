import { Product } from '@/domain';

export interface AddProductRepository {
  add: (product: Product) => Promise<void>;
}
