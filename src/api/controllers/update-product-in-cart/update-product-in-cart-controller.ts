import { z } from 'zod';

import { UpdateProductInCartRequestSchema } from './update-product-in-cart-controller-validation-schema';

import { Controller, HttpResponse } from '@/api/contracts';
import { UpdateProductInCart } from '@/domain';
import { mapErrorByCode, noContent } from '@/api/helpers';

export type UpdateProductInCartParams = z.infer<typeof UpdateProductInCartRequestSchema>;

export class UpdateProductInCartController implements Controller {
  constructor(private readonly updateProductInCart: UpdateProductInCart) {}
  handle = async ({
    shoppingEventId,
    productId,
    name,
    amount,
    price,
    wholesaleMinAmount,
    wholesalePrice,
  }: UpdateProductInCartParams): Promise<HttpResponse> => {
    const updateProductInCartResult = await this.updateProductInCart.execute({
      shoppingEventId,
      productId,
      name,
      amount,
      price,
      wholesaleMinAmount,
      wholesalePrice,
    });

    if (updateProductInCartResult.isLeft()) {
      return mapErrorByCode(updateProductInCartResult.value);
    }

    const product = updateProductInCartResult.value;

    console.log(product);

    return noContent();
  };
}
