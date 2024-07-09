import { Controller, HttpResponse, unauthorized } from '@/api';
import { GetUser } from '@/domain';
import { firebaseApp } from '@/main/firebase/client';

export class AuthorizationControllerDecorator implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly getUser?: GetUser,
  ) {}
  handle = async (request: any): Promise<HttpResponse> => {
    try {
      const authToken = request.authToken;

      if (!authToken) {
        return unauthorized({
          details: 'x-authorization-token header is required',
        });
      }

      const decodedToken = await firebaseApp.auth().verifyIdToken(authToken);

      request.user = decodedToken.uid;

      const httpResponse = await this.controller.handle(request);

      return httpResponse;
    } catch (error) {
      console.error(error);

      return unauthorized();
    }
  };
}
