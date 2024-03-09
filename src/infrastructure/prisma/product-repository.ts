import { ProductMapper } from './mappers';

import { ProductRepositories } from '@/application';
import { Product } from '@/domain';
import { prisma } from '@/main/prisma/client';

export class PrismaProductRepository implements ProductRepositories {
  add = async (product: Product): Promise<void> => {
    await prisma.product.create({
      data: ProductMapper.toCreatePersistence(product),
    });
  };
}
