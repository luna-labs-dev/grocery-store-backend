import { Controller, HttpResponse, unauthorized } from '@/api';
import { GetUser } from '@/domain';

export class FamilyBarrierControllerDecorator implements Controller {
  constructor(
    private controller: Controller,
    private readonly getUser: GetUser,
  ) {}

  handle = async (request: any): Promise<HttpResponse> => {
    try {
      const externalUserId = request.user;
      const dbUserResult = await this.getUser.execute({
        externalId: externalUserId,
      });

      if (dbUserResult.isLeft()) {
        return unauthorized({
          requiredAction: 'register-user',
        });
      }

      const dbUser = dbUserResult.value;

      if (!dbUser.familyId) {
        // if user is not member of any family, return unauthorized with required action to add user to family
        return unauthorized({
          requiredAction: 'add-user-to-family',
        });
      }

      const httpResponse = await this.controller.handle(request);

      return httpResponse;
    } catch (error) {
      console.error(error);

      return unauthorized();
    }
  };
}
