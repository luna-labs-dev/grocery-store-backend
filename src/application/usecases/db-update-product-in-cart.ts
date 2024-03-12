import { GetShoppingEventByIdRepository, UpdateShoppingEventRepository } from '../contracts';

import {
  Either,
  left,
  Product,
  ProductNotFoundError,
  right,
  ShoppingEventNotFoundError,
  UnexpectedError,
  UpdateProductInCart,
  UpdateProductInCartErrors,
  UpdateProductInCartParams,
} from '@/domain';

type UpdateProductInCartRepositories = GetShoppingEventByIdRepository &
  UpdateShoppingEventRepository;

export class DbUpdateProductInCart implements UpdateProductInCart {
  constructor(private readonly repository: UpdateProductInCartRepositories) {}

  execute = async ({
    shoppingEventId,
    productId,
    name,
    amount,
    price,
    wholesaleMinAmount,
    wholesalePrice,
  }: UpdateProductInCartParams): Promise<Either<UpdateProductInCartErrors, Product>> => {
    try {
      // Fetch shoppingEvent
      const shoppingEvent = await this.repository.getById({
        shoppingEventId,
      });

      // Return shoppingEventNotFoundError if shoppingEvent is undefined
      if (!shoppingEvent) {
        return left(new ShoppingEventNotFoundError());
      }

      // Return productNotFoundError if product not in list
      const product = shoppingEvent.products.getItemById(productId);

      if (!product) {
        return left(new ProductNotFoundError());
      }

      // Update product with new values
      product.update({
        name,
        amount,
        price,
        wholesaleMinAmount,
        wholesalePrice,
      });

      shoppingEvent.products.add(product);

      // Update shoppingEvent in database
      await this.repository.update(shoppingEvent);

      // return product object
      return right(product);
    } catch (error) {
      console.error(error);

      return left(new UnexpectedError());
    }
  };
}
