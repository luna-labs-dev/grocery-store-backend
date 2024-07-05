import { z } from 'zod';

import { getShoppingEventListRequestSchema } from './get-shopping-event-list-controller-validation-schema';

import { Controller, HttpResponse } from '@/api/contracts';
import { mapErrorByCode, ok } from '@/api/helpers';
import { GetShoppingEventList } from '@/domain';

type GetShoppingEventListControllerParams = z.infer<typeof getShoppingEventListRequestSchema>;

export class GetShoppingEventListController implements Controller {
  constructor(private readonly getShoppingEventList: GetShoppingEventList) {}
  handle = async ({
    status,
    period,
    pageIndex,
    pageSize,
    orderBy,
    orderDirection,
  }: GetShoppingEventListControllerParams): Promise<HttpResponse> => {
    const result = await this.getShoppingEventList.execute({
      status,
      period: period && {
        start: new Date(period.start),
        end: new Date(period.end),
      },
      pageIndex,
      pageSize,
      orderBy,
      orderDirection,
    });

    if (result.isLeft()) {
      return mapErrorByCode(result.value);
    }

    const shoppingEvent = result.value;

    const response = {
      total: shoppingEvent.total,
      items: shoppingEvent.shoppingEvents.map((se) => ({
        id: se.id,
        status: se.status,
        market: se.market?.name,
        totals: {
          retailTotal: se.retailTotal,
          wholesaleTotal: se.wholesaleTotal,
        },
        createdAt: se.createdAt,
      })),
    };

    return ok(response);
  };
}
