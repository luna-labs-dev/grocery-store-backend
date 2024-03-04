import { z } from 'zod';

import { getShoppingEventByIdRequestSchema } from './get-shopping-event-by-id-controller-validation-schema';

import { Controller, HttpResponse } from '@/api/contracts';
import { GetShoppingEventById } from '@/domain';
import { mapErrorByCode, ok } from '@/api/helpers';

type GetShoppingEventByIdControllerParams = z.infer<typeof getShoppingEventByIdRequestSchema>;

export class GetShoppingEventByIdController implements Controller {
  constructor(private readonly getShoppingEventById: GetShoppingEventById) {}
  handle = async ({
    shoppingEventId,
  }: GetShoppingEventByIdControllerParams): Promise<HttpResponse> => {
    const result = await this.getShoppingEventById.execute({
      shoppingEventId,
    });

    if (result.isLeft()) {
      return mapErrorByCode(result.value);
    }

    const shoppingEvent = result.value;

    const response = {
      id: shoppingEvent.id,
      status: shoppingEvent.status,
      market: {
        id: shoppingEvent.marketId,
        name: shoppingEvent.market?.name,
      },
      calculatedTotals: shoppingEvent.getCalculatedTotals(),
      producs: shoppingEvent.products.getItems().map((prod) => ({
        id: prod.id,
        name: prod.name,
        amount: prod.amount,
        wholesaleMinAmount: prod.wholesaleMinAmount,
        price: prod.price,
        whosalePrice: prod.wholesalePrice,
        addedAt: prod.addedAt,
      })),
      createdAt: shoppingEvent.createdAt,
      finishedAt: shoppingEvent.finishedAt,
      createdBy: shoppingEvent.createdBy,
    };

    return ok(response);
  };
}
