import { inject } from 'tsyringe';
import { z } from 'zod';

import { getMarketByIdRequestSchema } from './get-market-by-id-controller-validation-schema';

import { Controller, HttpResponse } from '@/api/contracts';
import { mapErrorByCode, ok } from '@/api/helpers';
import { GetMarketById } from '@/domain';
import { injection } from '@/main/di/injection-codes';

const { usecases } = injection;

type GetMarketByIdControllerParams = z.infer<typeof getMarketByIdRequestSchema>;

export class GetMarketByIdController implements Controller {
  constructor(@inject(usecases.getMarketById) private readonly getMarketById: GetMarketById) {}

  handle = async ({ marketId }: GetMarketByIdControllerParams): Promise<HttpResponse> => {
    const result = await this.getMarketById.execute({
      marketId,
    });

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
