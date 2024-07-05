import { inject, injectable } from 'tsyringe';
import { z } from 'zod';

import { addMarketRequestSchema } from './add-market-controller-validation-schema';

import { Controller, HttpResponse } from '@/api/contracts';
import { created, mapErrorByCode } from '@/api/helpers';
import { AddMarket } from '@/domain';
import { injection } from '@/main/di/injection-codes';

type AddMarketControllerRequest = z.infer<typeof addMarketRequestSchema>;

const { usecases } = injection;

@injectable()
export class AddMarketController implements Controller {
  constructor(@inject(usecases.newMarket) private readonly newMarket: AddMarket) {}

  handle = async (request: AddMarketControllerRequest): Promise<HttpResponse> => {
    const { marketName, user } = request;

    const result = await this.newMarket.execute({
      marketName,
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

    return created(response);
  };
}
