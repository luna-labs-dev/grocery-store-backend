import { inject, injectable } from 'tsyringe';
import { z } from 'zod';

import { getMarketListRequestSchema } from './get-market-list-controller-validation-schema';

import { Controller, HttpResponse } from '@/api/contracts';
import { mapErrorByCode, ok } from '@/api/helpers';
import { GetMarketList } from '@/domain';
import { controllerErrorHandler, controllerValidationHandler } from '@/main/decorators';
import { injection } from '@/main/di/injection-codes';

type GetMarketListControllerRequest = z.infer<typeof getMarketListRequestSchema>;

const { usecases } = injection;

@injectable()
@controllerErrorHandler()
@controllerValidationHandler(getMarketListRequestSchema)
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
