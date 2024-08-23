import { inject, injectable } from 'tsyringe';
import { z } from 'zod';

import { Controller, HttpResponse } from '@/api/contracts';
import { mapErrorByCode, ok } from '@/api/helpers';
import { GetMarketList } from '@/domain';

import {
  controllerAuthorizationHandling,
  controllerErrorHandling,
  controllerFamilyBarrierHandling,
  controllerValidationHandling,
} from '@/main/decorators';
import { injection } from '@/main/di/injection-codes';

const { usecases } = injection;

export const getMarketListRequestSchema = z.object({
  familyId: z.string().uuid(),
  search: z.string().optional(),
  pageIndex: z.coerce.number().min(0).default(0),
  pageSize: z.coerce.number().min(1).max(50).default(10),
  orderBy: z.enum(['createdAt']).default('createdAt'),
  orderDirection: z.enum(['desc', 'asc']).default('desc'),
});

type GetMarketListControllerRequest = z.infer<typeof getMarketListRequestSchema>;

@injectable()
@controllerErrorHandling()
@controllerAuthorizationHandling()
@controllerFamilyBarrierHandling()
@controllerValidationHandling(getMarketListRequestSchema)
export class GetMarketListController implements Controller {
  constructor(@inject(usecases.getMarketList) private readonly getMarketList: GetMarketList) {}

  async handle(request: GetMarketListControllerRequest): Promise<HttpResponse> {
    const { familyId, search, pageIndex, pageSize, orderBy, orderDirection } = request;
    const getMarketListResult = await this.getMarketList.execute({
      familyId,
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
  }
}
