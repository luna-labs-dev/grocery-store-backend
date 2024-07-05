import { inject, injectable } from 'tsyringe';

import { GetShoppingEventByIdRepository, UpdateShoppingEventRepository } from '@/application';
import {
  AddProductToCart,
  AddProductToCartErrors,
  AddProductToCartParams,
  Either,
  Product,
  ShoppingEventAlreadyEndedError,
  ShoppingEventNotFoundError,
  UnexpectedError,
  left,
  right,
} from '@/domain';
import { injection } from '@/main/di/injection-codes';

type ShoppingEventRepositories = GetShoppingEventByIdRepository & UpdateShoppingEventRepository;

const { infra } = injection;

@injectable()
export class DbAddProductToCart implements AddProductToCart {
  constructor(
    @inject(infra.shoppingEventRepositories)
    private readonly shoppingEventRepository: ShoppingEventRepositories,
  ) {}

  execute = async ({
    user,
    shoppingEventId,
    name,
    amount,
    price,
    wholesaleMinAmount,
    wholesalePrice,
  }: AddProductToCartParams): Promise<Either<AddProductToCartErrors, Product>> => {
    try {
      // Fetch ShoppingEvent
      const shoppingEvent = await this.shoppingEventRepository.getById({
        shoppingEventId,
      });

      // Returns ShoppingEventNotFoundError fetch returns undefined
      if (!shoppingEvent) {
        return left(new ShoppingEventNotFoundError());
      }

      if (shoppingEvent.status !== 'ONGOING') {
        return left(new ShoppingEventAlreadyEndedError(shoppingEvent.status, shoppingEvent.id));
      }

      // Created the Product Entity
      const product = Product.create({
        shoppingEventId,
        name,
        amount,
        price,
        wholesaleMinAmount,
        wholesalePrice,
        addedAt: new Date(),
        addedBy: user,
      });

      // Push the product to the shoppingEvent product list
      shoppingEvent.addProduct(product);

      // Update shoppingEvent
      await this.shoppingEventRepository.update(shoppingEvent);

      // Returns the recently created product
      return right(product);
    } catch (error) {
      console.error(error);

      return left(new UnexpectedError());
    }
  };
}
