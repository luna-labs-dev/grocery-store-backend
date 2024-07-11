import { inject, injectable } from 'tsyringe';
import { z } from 'zod';

import { Controller, HttpResponse } from '@/api/contracts';
import { mapErrorByCode, ok } from '@/api/helpers';
import { EndShoppingEvent } from '@/domain';
import {
  controllerAuthorizationHandling,
  controllerErrorHandling,
  controllerFamilyBarrierHandling,
  controllerValidationHandling,
} from '@/main/decorators';
import { injection } from '@/main/di/injection-codes';

export const EndShoppingEventRequestSchema = z.object({
  shoppingEventId: z.string().uuid(),
  familyId: z.string().uuid(),
  totalPaid: z.number().min(0),
});

export type EndShoppingEventControllerRequest = z.infer<typeof EndShoppingEventRequestSchema>;
const { usecases } = injection;
@injectable()
@controllerAuthorizationHandling()
@controllerFamilyBarrierHandling()
@controllerErrorHandling()
@controllerValidationHandling(EndShoppingEventRequestSchema)
export class EndShoppingEventController implements Controller {
  constructor(
    @inject(usecases.endShoppingEvent) private readonly endShoppingEvent: EndShoppingEvent,
  ) {}

  async handle({
    shoppingEventId,
    familyId,
    totalPaid,
  }: EndShoppingEventControllerRequest): Promise<HttpResponse> {
    const endShoppingEventResult = await this.endShoppingEvent.execute({
      shoppingEventId,
      familyId,
      totalPaid,
    });

    if (endShoppingEventResult.isLeft()) {
      return mapErrorByCode(endShoppingEventResult.value);
    }

    const shoppingEvent = endShoppingEventResult.value;

    const response = {
      id: shoppingEvent.id,
      status: shoppingEvent.status,
      market: {
        id: shoppingEvent.marketId,
        name: shoppingEvent.market?.name,
      },
      calculatedTotals: shoppingEvent.getCalculatedTotals(),
      createdAt: shoppingEvent.createdAt,
      finishedAt: shoppingEvent.finishedAt,
      createdBy: shoppingEvent.createdBy,
    };
    return ok(response);
  }
}
