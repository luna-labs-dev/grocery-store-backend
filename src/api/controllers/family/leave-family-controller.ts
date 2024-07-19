import { Controller, HttpResponse } from '@/api/contracts';
import { mapErrorByCode, ok } from '@/api/helpers';
import { LeaveFamily } from '@/domain';
import {
  controllerAuthorizationHandling,
  controllerErrorHandling,
  controllerValidationHandling,
} from '@/main/decorators';
import { injection } from '@/main/di/injection-codes';
import { inject, injectable } from 'tsyringe';
import { z } from 'zod';

const { usecases } = injection;

export const leaveFamilyRequestSchema = z.object({
  user: z.string(),
  familyId: z.string(),
});

export type LeaveFamilyControllerRequest = z.infer<typeof leaveFamilyRequestSchema>;

@injectable()
@controllerErrorHandling()
@controllerAuthorizationHandling()
@controllerValidationHandling(leaveFamilyRequestSchema)
export class LeaveFamilyController implements Controller {
  constructor(@inject(usecases.leaveFamily) private readonly leaveFamily: LeaveFamily) {}

  async handle({ user, familyId }: LeaveFamilyControllerRequest): Promise<HttpResponse> {
    const result = await this.leaveFamily.execute({ userId: user, familyId });

    if (result.isLeft()) {
      return mapErrorByCode(result.value);
    }

    return ok();
  }
}
