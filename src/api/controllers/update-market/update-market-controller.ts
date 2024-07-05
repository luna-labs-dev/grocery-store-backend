import { inject, injectable } from 'tsyringe';
import { z } from 'zod';

import { updateMarketRequestSchema } from './update-market-controller-validation-schema';

import { mapErrorByCode, ok } from '@/api';
import { Controller, HttpResponse } from '@/api/contracts';
import { UpdateMarket } from '@/domain';
import { injection } from '@/main/di/injection-codes';

export type UpdateMarketControllerRequest = z.infer<typeof updateMarketRequestSchema>;

const { usecases } = injection;
@injectable()
export class UpdateMarketController implements Controller {
  constructor(@inject(usecases.updateMarket) private readonly updateMarket: UpdateMarket) {}

  handle = async (request: UpdateMarketControllerRequest): Promise<HttpResponse> => {
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
  };
}
