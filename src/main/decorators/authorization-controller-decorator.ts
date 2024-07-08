import { Controller, HttpResponse, unauthorized } from '@/api';
import { GetUserByIdRepository } from '@/application';
import { firebaseApp } from '@/main/firebase/client';

export class AuthorizationControllerDecorator implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly userRepository: GetUserByIdRepository,
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

      // TODO: Fetch user from db
      const dbUser = await this.userRepository.getByExternalId(decodedToken.uid);

      // If no user is found in db, return unauthorized with required action to register user
      if (!dbUser) {
        return unauthorized({
          requiredAction: 'register-user',
        });
      }

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
