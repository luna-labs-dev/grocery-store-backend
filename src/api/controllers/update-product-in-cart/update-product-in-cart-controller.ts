import { z } from 'zod';

import { updateProductInCartRequestSchema } from './update-product-in-cart-controller-validation-schema';

import { Controller, HttpResponse } from '@/api/contracts';
import { mapErrorByCode, noContent } from '@/api/helpers';
import { UpdateProductInCart } from '@/domain';

export type UpdateProductInCartParams = z.infer<typeof updateProductInCartRequestSchema>;

export class UpdateProductInCartController implements Controller {
  constructor(private readonly updateProductInCart: UpdateProductInCart) {}
  handle = async ({
    familyId,
    shoppingEventId,
    productId,
    name,
    amount,
    price,
    wholesaleMinAmount,
    wholesalePrice,
  }: UpdateProductInCartParams): Promise<HttpResponse> => {
    const updateProductInCartResult = await this.updateProductInCart.execute({
      familyId,
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
