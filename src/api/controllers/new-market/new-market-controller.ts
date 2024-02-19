import { inject, injectable } from 'tsyringe';
import { z } from 'zod';

import { newMarketRequestSchema } from './new-market-controller-validation-schema';

import { Controller, HttpResponse } from '@/api/contracts';
import { NewMarket } from '@/domain';
import { mapErrorByCode, ok } from '@/api/helpers';

type NewMarketControllerRequest = z.infer<typeof newMarketRequestSchema>;

@injectable()
export class NewMarketController implements Controller {
  constructor(@inject('NewMarket') private readonly newMarket: NewMarket) {}

  handle = async (request: NewMarketControllerRequest): Promise<HttpResponse> => {
    const { name, user } = request;

    const result = await this.newMarket.execute({
      name,
      user,
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
