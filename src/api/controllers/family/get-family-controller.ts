import { Controller, HttpResponse } from '@/api/contracts';
import { mapErrorByCode, ok } from '@/api/helpers';
import { GetFamily } from '@/domain';
import {
  controllerAuthorizationHandling,
  controllerErrorHandling,
  controllerFamilyBarrierHandling,
  controllerValidationHandling,
} from '@/main/decorators';
import { injection } from '@/main/di/injection-codes';
import { inject, injectable } from 'tsyringe';
import { z } from 'zod';

const { usecases } = injection;

export const getFamilyRequestSchema = z.object({
  user: z.string(),
});

export type GetFamilyControllerRequest = z.infer<typeof getFamilyRequestSchema>;

@injectable()
@controllerErrorHandling()
@controllerFamilyBarrierHandling()
@controllerAuthorizationHandling()
@controllerValidationHandling(getFamilyRequestSchema)
export class GetFamilyController implements Controller {
  constructor(@inject(usecases.getFamily) private readonly getFamily: GetFamily) {}

  async handle({ user }: GetFamilyControllerRequest): Promise<HttpResponse> {
    const result = await this.getFamily.execute({ userId: user });

    if (result.isLeft()) {
      return mapErrorByCode(result.value);
    }
    const family = result.value;

    const response = {
      name: family.name,
      description: family.description,
      owner: {
        id: family.owner.id,
        displayName: family.owner.displayName,
        email: family.owner.email,
      },
      inviteCode: family.inviteCode,
      members: family.members
        ? family.members.map((member) => ({
            id: member.id,
            displayName: member.displayName,
            email: member.email,
          }))
        : undefined,
      createdAt: family.createdAt,
      createdBy: family.createdBy,
    };

    return ok(response);
  }
}
