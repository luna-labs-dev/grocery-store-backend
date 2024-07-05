import { inject, injectable } from 'tsyringe';
import { z } from 'zod';

import { AddProductToCart } from '../../../domain/usecases/add-product-to-cart';

import { addProductToCartRequestSchema } from './add-product-to-cart-controller-validation-schema';

import { Controller, HttpResponse } from '@/api/contracts';
import { mapErrorByCode, ok } from '@/api/helpers';
import { injection } from '@/main/di/injection-codes';

export type AddProductToCartRequest = z.infer<typeof addProductToCartRequestSchema>;

const { usecases } = injection;

@injectable()
export class AddProductToCartController implements Controller {
  constructor(
    @inject(usecases.addProductToCart) private readonly addProductToCart: AddProductToCart,
  ) {}

  handle = async (request: AddProductToCartRequest): Promise<HttpResponse> => {
    const { user, shoppingEventId, name, amount, wholesaleMinAmount, price, wholesalePrice } =
      request;

    const addProductResult = await this.addProductToCart.execute({
      user,
      shoppingEventId,
      name,
      amount,
      wholesaleMinAmount,
      price,
      wholesalePrice,
    });

    if (addProductResult.isLeft()) {
      return mapErrorByCode(addProductResult.value);
    }

    const product = addProductResult.value;

    const response = {
      id: product.id,
      addedAt: product.addedAt,
    };

    return ok(response);
  };
}
