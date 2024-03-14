import { Prisma } from '@prisma/client';

import { Product } from '@/domain';

type ProductCreatePersistence = Prisma.productCreateInput;
type ProductUpdatePersistence = Prisma.productUpdateInput;

export class ProductMapper {
  static toCreatePersistence(product: Product): ProductCreatePersistence {
    const persistence: ProductCreatePersistence = {
      id: product.id,
      shoppingEvent: {
        connect: {
          id: product.shoppingEventId,
        },
      },
      name: product.name,
      amount: product.amount,
      wholesaleMinAmount: product.wholesaleMinAmount,
      price: product.price,
      wholesalePrice: product.wholesalePrice,
      addedAt: product.addedAt,
      addedBy: product.addedBy,
    };
    return persistence;
  }

  static toUpdatePersistence(product: Product): ProductUpdatePersistence {
    return {
      name: product.name,
      amount: product.amount,
      wholesaleMinAmount: product.wholesaleMinAmount,
      price: product.price,
      wholesalePrice: product.wholesalePrice,
    };
  }
}
