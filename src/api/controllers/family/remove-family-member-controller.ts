import { Controller, HttpResponse } from '@/api/contracts';
import { mapErrorByCode, ok } from '@/api/helpers';
import { RemoveFamilyMember } from '@/domain';
import {
  controllerAuthorizationHandling,
  controllerErrorHandling,
  controllerValidationHandling,
} from '@/main/decorators';
import { injection } from '@/main/di/injection-codes';
import { inject, injectable } from 'tsyringe';
import { z } from 'zod';

const { usecases } = injection;

export const removeFamilyMemberRequestSchema = z.object({
  userToBeRemovedId: z.string().uuid(),
  user: z.string(),
});

export type RemoveFamilyMemberControllerRequest = z.infer<typeof removeFamilyMemberRequestSchema>;

@injectable()
@controllerErrorHandling()
@controllerAuthorizationHandling()
@controllerValidationHandling(removeFamilyMemberRequestSchema)
export class RemoveFamilyMemberController implements Controller {
  constructor(
    @inject(usecases.removeFamilyMember)
    private readonly removeFamilyController: RemoveFamilyMember,
  ) {}

  async handle({
    user,
    userToBeRemovedId,
  }: RemoveFamilyMemberControllerRequest): Promise<HttpResponse> {
    const result = await this.removeFamilyController.execute({
      userId: user,
      userToBeRemovedId,
    });

    if (result.isLeft()) {
      return mapErrorByCode(result.value);
    }

    return ok();
  }
}
