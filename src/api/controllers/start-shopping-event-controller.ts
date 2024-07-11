import { inject, injectable } from 'tsyringe';
import { z } from 'zod';

import { Controller, HttpResponse } from '@/api/contracts';
import { mapErrorByCode, ok } from '@/api/helpers';
import { StartShoppingEvent } from '@/domain';
import { controllerAuthorizationHandling } from '@/main/decorators/controller-authorization-handling';
import { controllerErrorHandling } from '@/main/decorators/controller-error-handling';
import { controllerFamilyBarrierHandling } from '@/main/decorators/controller-family-barrier-handling';
import { controllerValidationHandling } from '@/main/decorators/controller-validation-handling';
import { injection } from '@/main/di/injection-codes';

const { usecases } = injection;

export const StartShoppingEventRequestSchema = z.object({
  user: z.string(),
  familyId: z.string().uuid(),
  marketId: z.string().uuid(),
});

export type StartShoppingEventControllerRequest = z.infer<typeof StartShoppingEventRequestSchema>;

@injectable()
@controllerAuthorizationHandling()
@controllerFamilyBarrierHandling()
@controllerErrorHandling()
@controllerValidationHandling(StartShoppingEventRequestSchema)
export class StartShoppingEventController implements Controller {
  constructor(
    @inject(usecases.startShoppingEvent)
    private readonly startShoppingEvent: StartShoppingEvent,
  ) {}

  async handle({
    user,
    familyId,
    marketId,
  }: StartShoppingEventControllerRequest): Promise<HttpResponse> {
    const startShoppingEventResult = await this.startShoppingEvent.execute({
      user,
      familyId,
      marketId,
    });

    if (startShoppingEventResult.isLeft()) {
      return mapErrorByCode(startShoppingEventResult.value);
    }

    const shoppingEvent = startShoppingEventResult.value;

    const response = {
      id: shoppingEvent.id,
      market: shoppingEvent.market?.name,
      status: shoppingEvent.status,
      createdAt: shoppingEvent.createdAt,
    };
    return await Promise.resolve(ok(response));
  }
}
