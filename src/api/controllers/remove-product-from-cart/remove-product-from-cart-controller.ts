import { inject, injectable } from 'tsyringe';
import { z } from 'zod';

import { removeProductFromCartRequestSchema } from './remove-product-from-cart-controller-validation-schema';

import { Controller, HttpResponse } from '@/api/contracts';
import { mapErrorByCode, noContent } from '@/api/helpers';
import { RemoveProductFromCart } from '@/domain';
import { injection } from '@/main/di/injection-codes';

export type RemoveProductFromCartControllerParams = z.infer<
  typeof removeProductFromCartRequestSchema
>;

const { usecases } = injection;
@injectable()
export class RemoveProductFromCartController implements Controller {
  constructor(
    @inject(usecases.removeProductFromCart)
    private readonly removeProductFromCart: RemoveProductFromCart,
  ) {}

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
