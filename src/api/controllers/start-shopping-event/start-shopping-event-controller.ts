import { z } from 'zod';

import { StartShoppingEventRequestSchema } from './start-shopping-event-controller-validation-schema';

import { Controller, HttpResponse } from '@/api/contracts';
import { mapErrorByCode, ok } from '@/api/helpers';
import { StartShoppingEvent } from '@/domain';

export type StartShoppingEventControllerRequest = z.infer<typeof StartShoppingEventRequestSchema>;

export class StartShoppingEventController implements Controller {
  constructor(private readonly startShoppingEvent: StartShoppingEvent) {}
  handle = async ({
    user,
    marketId,
  }: StartShoppingEventControllerRequest): Promise<HttpResponse> => {
    const startShoppingEventResult = await this.startShoppingEvent.execute({
      user,
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
  };
}
