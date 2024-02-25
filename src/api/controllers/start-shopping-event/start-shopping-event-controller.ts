import { z } from 'zod';

import { StartShoppingEventRequestSchema } from './start-shopping-event-controller-validation-schema';

import { Controller, HttpResponse } from '@/api/contracts';
import { ok } from '@/api/helpers';
import { StartShoppingEvent } from '@/domain';

export type StartShoppingEventControllerRequest = z.infer<typeof StartShoppingEventRequestSchema>;

export class StartShoppingEventController implements Controller {
  constructor(private readonly startShoppingEvent: StartShoppingEvent) {}
  handle = async ({
    user,
    marketId,
  }: StartShoppingEventControllerRequest): Promise<HttpResponse> => {
    await this.startShoppingEvent.execute({
      user,
      marketId,
    });
    return await Promise.resolve(ok({}));
  };
}
