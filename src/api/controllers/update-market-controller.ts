import { inject, injectable } from 'tsyringe';
import { z } from 'zod';

import { mapErrorByCode, ok } from '@/api';
import { Controller, HttpResponse } from '@/api/contracts';
import { UpdateMarket } from '@/domain';
import { controllerAuthorizationHandling } from '@/main/decorators/controller-authorization-handling';
import { controllerErrorHandling } from '@/main/decorators/controller-error-handling';
import { controllerFamilyBarrierHandling } from '@/main/decorators/controller-family-barrier-handling';
import { controllerValidationHandling } from '@/main/decorators/controller-validation-handling';
import { injection } from '@/main/di/injection-codes';

export const updateMarketRequestSchema = z.object({
  name: z.string().min(1),
  marketId: z.string().uuid(),
});

export type UpdateMarketControllerRequest = z.infer<typeof updateMarketRequestSchema>;

const { usecases } = injection;

@injectable()
@controllerAuthorizationHandling()
@controllerFamilyBarrierHandling()
@controllerErrorHandling()
@controllerValidationHandling(updateMarketRequestSchema)
export class UpdateMarketController implements Controller {
  constructor(@inject(usecases.updateMarket) private readonly updateMarket: UpdateMarket) {}

  async handle(request: UpdateMarketControllerRequest): Promise<HttpResponse> {
    const { marketId, name } = request;
    const result = await this.updateMarket.execute({ marketId, name });

    if (result.isLeft()) {
      return mapErrorByCode(result.value);
    }

    const market = result.value;

    const response = {
      id: market.id,
      code: market.code,
      name: market.name,
      createdAt: market.createdAt,
    };

    return ok(response);
  }
}
