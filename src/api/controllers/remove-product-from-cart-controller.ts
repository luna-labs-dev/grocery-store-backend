import { controllerAuthorizationHandling } from '@/main/decorators/controller-authorization-handling';
import { controllerErrorHandling } from '@/main/decorators/controller-error-handling';
import { controllerFamilyBarrierHandling } from '@/main/decorators/controller-family-barrier-handling';
import { controllerValidationHandling } from '@/main/decorators/controller-validation-handling';
import { inject, injectable } from 'tsyringe';
import { z } from 'zod';

import { Controller, HttpResponse } from '@/api/contracts';
import { mapErrorByCode, noContent } from '@/api/helpers';
import { RemoveProductFromCart } from '@/domain';
import { injection } from '@/main/di/injection-codes';
const { usecases } = injection;

export const removeProductFromCartRequestSchema = z.object({
  familyId: z.string().uuid(),
  shoppingEventId: z.string().uuid(),
  productId: z.string().uuid(),
});

export type RemoveProductFromCartControllerParams = z.infer<
  typeof removeProductFromCartRequestSchema
>;

@injectable()
@controllerAuthorizationHandling()
@controllerFamilyBarrierHandling()
@controllerErrorHandling()
@controllerValidationHandling(removeProductFromCartRequestSchema)
export class RemoveProductFromCartController implements Controller {
  constructor(
    @inject(usecases.removeProductFromCart)
    private readonly removeProductFromCart: RemoveProductFromCart,
  ) {}

  async handle({
    familyId,
    shoppingEventId,
    productId,
  }: RemoveProductFromCartControllerParams): Promise<HttpResponse> {
    const removeProductFromCartResult = await this.removeProductFromCart.execute({
      familyId,
      shoppingEventId,
      productId,
    });

    if (removeProductFromCartResult.isLeft()) {
      return mapErrorByCode(removeProductFromCartResult.value);
    }

    return noContent();
  }
}
