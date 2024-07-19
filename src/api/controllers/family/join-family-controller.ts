import { Controller, HttpResponse } from '@/api/contracts';
import { mapErrorByCode, ok } from '@/api/helpers';
import { JoinFamily } from '@/domain';
import {
  controllerAuthorizationHandling,
  controllerErrorHandling,
  controllerValidationHandling,
} from '@/main/decorators';
import { injection } from '@/main/di/injection-codes';
import { inject, injectable } from 'tsyringe';
import { z } from 'zod';

const { usecases } = injection;

export const joinFamilyRequestSchema = z.object({
  user: z.string(),
  inviteCode: z.string(),
});

export type JoinFamilyControllerRequest = z.infer<typeof joinFamilyRequestSchema>;

@injectable()
@controllerErrorHandling()
@controllerAuthorizationHandling()
@controllerValidationHandling(joinFamilyRequestSchema)
export class JoinFamilyController implements Controller {
  constructor(@inject(usecases.joinFamily) private readonly joinFamily: JoinFamily) {}

  async handle({ user, inviteCode }: JoinFamilyControllerRequest): Promise<HttpResponse> {
    const result = await this.joinFamily.execute({ userId: user, inviteCode });

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
