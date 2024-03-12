import { z } from 'zod';

import { removeProductFromCartRequestSchema } from './remove-product-from-cart-controller-validation-schema';

import { Controller, HttpResponse } from '@/api/contracts';
import { RemoveProductFromCart } from '@/domain';
import { mapErrorByCode, noContent } from '@/api/helpers';

export type RemoveProductFromCartControllerParams = z.infer<
  typeof removeProductFromCartRequestSchema
>;

export class RemoveProductFromCartController implements Controller {
  constructor(private readonly removeProductFromCart: RemoveProductFromCart) {}

  handle = async ({
    shoppingEventId,
    productId,
  }: RemoveProductFromCartControllerParams): Promise<HttpResponse> => {
    const removeProductFromCartResult = await this.removeProductFromCart.execute({
      shoppingEventId,
      productId,
    });

    if (removeProductFromCartResult.isLeft()) {
      return mapErrorByCode(removeProductFromCartResult.value);
    }

    return noContent();
  };
}
