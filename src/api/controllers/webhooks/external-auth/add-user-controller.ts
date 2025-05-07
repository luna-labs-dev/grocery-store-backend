import { Controller, HttpResponse } from '@/api/contracts';
import { mapErrorByCode, ok } from '@/api/helpers';
import { AddUser } from '@/domain';
import { injection } from '@/main/di/injection-codes';
import { inject, injectable } from 'tsyringe';
import { z } from 'zod';
import { authWebhooksTypeList } from './types';

const { usecases } = injection;

export const webhookExternalAuthAddUserRequestSchema = z
  .object({
    type: z.enum(authWebhooksTypeList),
    data: z
      .object({
        id: z.string(),
      })
      .passthrough(),
  })
  .passthrough();

type WebhookExternalAuthAddUserControllerRequest = z.infer<
  typeof webhookExternalAuthAddUserRequestSchema
>;

@injectable()
export class WebhookExternalAuthAddUserController implements Controller {
  constructor(@inject(usecases.addUser) private readonly addUser: AddUser) {}

  async handle(request: WebhookExternalAuthAddUserControllerRequest): Promise<HttpResponse> {
    const { type, data } = request;

    const result = await this.addUser.execute({
      externalId: data.id,
    });

    if (result.isLeft()) {
      return mapErrorByCode(result.value);
    }

    return ok();
  }
}
