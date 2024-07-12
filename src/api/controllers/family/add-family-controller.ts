import { Controller, HttpResponse } from '@/api/contracts';
import { mapErrorByCode, ok } from '@/api/helpers';
import { AddFamily } from '@/domain';
import {
  controllerAuthorizationHandling,
  controllerErrorHandling,
  controllerValidationHandling,
} from '@/main/decorators';
import { injection } from '@/main/di';
import { inject, injectable } from 'tsyringe';
import { z } from 'zod';

const { usecases } = injection;

export const addFamilyRequestSchema = z.object({
  user: z.string(),
  name: z.string().max(100),
  description: z.string().optional(),
});

export type addFamilyControllerRequest = z.infer<typeof addFamilyRequestSchema>;

@injectable()
@controllerAuthorizationHandling()
@controllerErrorHandling()
@controllerValidationHandling(addFamilyRequestSchema)
export class AddFamillyController implements Controller {
  constructor(@inject(usecases.addFamily) private readonly addFamily: AddFamily) {}

  handle = async ({
    user,
    name,
    description,
  }: addFamilyControllerRequest): Promise<HttpResponse> => {
    const result = await this.addFamily.execute({
      userId: user,
      name,
      description,
    });

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
  };
}
