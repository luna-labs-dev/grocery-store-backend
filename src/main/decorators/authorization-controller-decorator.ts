import { firebaseApp } from '@/main/firebase/client';
import { Controller, HttpResponse, unauthorized } from '@/api';

export class AuthorizationControllerDecorator implements Controller {
  constructor(private readonly controller: Controller) {}
  handle = async (request: any): Promise<HttpResponse> => {
    const authToken = request.authToken;

    if (!authToken) {
      return unauthorized({
        details: 'x-authorization-token header is required',
      });
    }

    try {
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
