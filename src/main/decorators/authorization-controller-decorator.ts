import { Controller, HttpResponse, unauthorized } from '@/api';
import { GetUser } from '@/domain';
import { firebaseApp } from '@/main/firebase/client';

export class AuthorizationControllerDecorator implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly getUser: GetUser,
  ) {}
  handle = async (request: any): Promise<HttpResponse> => {
    const authToken = request.authToken;

    if (!authToken) {
      return unauthorized({
        details: 'x-authorization-token header is required',
      });
    }

    try {
      const decodedToken = await firebaseApp.auth().verifyIdToken(authToken);

      const dbUserResult = await this.getUser.execute({
        externalId: decodedToken.uid,
      });

      if (dbUserResult.isLeft()) {
        return unauthorized({
          requiredAction: 'register-user',
        });
      }

      const dbUser = dbUserResult.value;

      // if user is not member of any family, return unauthorized with required action to add user to family
      if (!dbUser.familyId) {
        return unauthorized({
          requiredAction: 'add-user-to-family',
        });
      }

      request.user = decodedToken.uid;

      const httpResponse = await this.controller.handle(request);

      return httpResponse;
    } catch (error) {
      console.error(error);

      return unauthorized();
    }
  };
}
