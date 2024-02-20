import { inject, injectable } from 'tsyringe';
import { z } from 'zod';

import { updateMarketRequestSchema } from './update-market-controller-validation-schema';

import { injection } from '@/main/di/injection-codes';
import { Controller, HttpResponse } from '@/api/contracts';
import { UpdateMarket } from '@/domain';
import { ok } from '@/api';

export type UpdateMarketControllerRequest = z.infer<typeof updateMarketRequestSchema>;

const { usecases } = injection;
@injectable()
export class UpdateMarketController implements Controller {
  constructor(@inject(usecases.updateMarket) private readonly updateMarket: UpdateMarket) {}

  handle = async ({ marketId, name }: UpdateMarketControllerRequest): Promise<HttpResponse> => {
    await this.updateMarket.execute({ marketId, name });

    return ok({});
  };
}
