import { z } from 'zod';
import { inject, injectable } from 'tsyringe';

import { getMarketListRequestSchema } from './get-market-list-controller-validation-schema';

import { Controller, HttpResponse } from '@/api/contracts';
import { GetMarketList } from '@/domain';
import { injection } from '@/main/di/injection-codes';
import { mapErrorByCode, ok } from '@/api/helpers';

type GetMarketListControllerRequest = z.infer<typeof getMarketListRequestSchema>;

const { usecases } = injection;

@injectable()
export class GetMarketListController implements Controller {
  constructor(@inject(usecases.getMarketList) private readonly getMarketList: GetMarketList) {}
  handle = async ({
    search,
    pageIndex,
    pageSize,
    orderBy,
    orderDirection,
  }: GetMarketListControllerRequest): Promise<HttpResponse> => {
    const getMarketListResult = await this.getMarketList.execute({
      search,
      pageIndex,
      pageSize,
      orderBy,
      orderDirection,
    });

    if (getMarketListResult.isLeft()) {
      return mapErrorByCode(getMarketListResult.value);
    }

    const market = getMarketListResult.value;

    const response = {
      total: market.total,
      items: market.markets.map((mkt) => ({
        id: mkt.id,
        code: mkt.code,
        name: mkt.name,
      })),
    };

    return ok(response);
  };
}
