import { z } from 'zod';

import { Controller, HttpResponse } from '@/api/contracts';
import { mapErrorByCode, noContent } from '@/api/helpers';
import { UpdateProductInCart } from '@/domain';
import { controllerAuthorizationHandling } from '@/main/decorators/controller-authorization-handling';
import { controllerErrorHandling } from '@/main/decorators/controller-error-handling';
import { controllerFamilyBarrierHandling } from '@/main/decorators/controller-family-barrier-handling';
import { controllerValidationHandling } from '@/main/decorators/controller-validation-handling';
import { inject, injectable } from 'tsyringe';

import { injection } from '@/main/di/injection-codes';

const { usecases } = injection;

export const updateProductInCartRequestSchema = z.object({
  familyId: z.string().uuid(),
  shoppingEventId: z.string().uuid(),
  productId: z.string().uuid(),
  name: z.string().min(1),
  amount: z.number().int().gt(0),
  price: z.number().gt(0),
  wholesaleMinAmount: z.number().int().gt(0).optional(),
  wholesalePrice: z.number().gt(0).optional(),
});

export type UpdateProductInCartParams = z.infer<typeof updateProductInCartRequestSchema>;

@injectable()
@controllerAuthorizationHandling()
@controllerFamilyBarrierHandling()
@controllerErrorHandling()
@controllerValidationHandling(updateProductInCartRequestSchema)
export class UpdateProductInCartController implements Controller {
  constructor(
    @inject(usecases.updateProductInCart) private readonly updateProductInCart: UpdateProductInCart,
  ) {}
  async handle({
    familyId,
    shoppingEventId,
    productId,
    name,
    amount,
    price,
    wholesaleMinAmount,
    wholesalePrice,
  }: UpdateProductInCartParams): Promise<HttpResponse> {
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
  }
}
