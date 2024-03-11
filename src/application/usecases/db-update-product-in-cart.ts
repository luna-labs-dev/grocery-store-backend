import {
  Either,
  left,
  Product,
  UnexpectedError,
  UpdateProductInCart,
  UpdateProductInCartErrors,
  UpdateProductInCartParams,
} from '@/domain';

export class DbUpdateProductInCart implements UpdateProductInCart {
  execute = async ({
    shoppingEventId,
    name,
    amount,
    price,
    wholesaleMinAmount,
    wholesalePrice,
  }: UpdateProductInCartParams): Promise<Either<UpdateProductInCartErrors, Product>> => {
    // Fetch shoppingEvent

    // Return shoppingEventNotFoundError if shoppingEvent is undefined

    // Return productNotFoundError if product not in list

    // Update product with new values

    // Update shoppingEvent in database

    // return product object
    return await Promise.resolve(left(new UnexpectedError()));
  };
}
