import { inject, injectable } from 'tsyringe';
import { z } from 'zod';

import { Controller, HttpResponse } from '@/api/contracts';
import { mapErrorByCode, ok } from '@/api/helpers';
import { GetMarketList } from '@/domain';

import { controllerAuthorizationHandling } from '@/main/decorators/controller-authorization-handling';
import { controllerErrorHandling } from '@/main/decorators/controller-error-handling';
import { controllerFamilyBarrierHandling } from '@/main/decorators/controller-family-barrier-handling';
import { controllerValidationHandling } from '@/main/decorators/controller-validation-handling';
import { injection } from '@/main/di/injection-codes';

export const getMarketListRequestSchema = z.object({
  search: z.string().optional(),
  pageIndex: z.coerce.number().min(0).default(0),
  pageSize: z.coerce.number().min(1).max(50).default(10),
  orderBy: z.enum(['createdAt']).default('createdAt'),
  orderDirection: z.enum(['desc', 'asc']).default('desc'),
});

type GetMarketListControllerRequest = z.infer<typeof getMarketListRequestSchema>;

const { usecases } = injection;

@injectable()
@controllerAuthorizationHandling()
@controllerFamilyBarrierHandling()
@controllerErrorHandling()
@controllerValidationHandling(getMarketListRequestSchema)
export class GetMarketListController implements Controller {
  constructor(@inject(usecases.getMarketList) private readonly getMarketList: GetMarketList) {}

  async handle(request: GetMarketListControllerRequest): Promise<HttpResponse> {
    const { search, pageIndex, pageSize, orderBy, orderDirection } = request;
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
  }
}
