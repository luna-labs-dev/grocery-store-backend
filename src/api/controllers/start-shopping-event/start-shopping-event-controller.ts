import { z } from 'zod';

import { StartShoppingEventRequestSchema } from './start-shopping-event-controller-validation-schema';

import { Controller, HttpResponse } from '@/api/contracts';
import { ok } from '@/api/helpers';

type StartShoppingEventControllerRequest = z.infer<typeof StartShoppingEventRequestSchema>;

export class StartShoppingEventController implements Controller {
  handle = async ({
    user,
    marketId,
  }: StartShoppingEventControllerRequest): Promise<HttpResponse> => {
    return await Promise.resolve(ok({}));
  };
}
