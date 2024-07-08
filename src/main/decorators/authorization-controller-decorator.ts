import { Controller, HttpResponse, unauthorized } from '@/api';
import { UserRepositories } from '@/application';
import { User } from '@/domain';
import { firebaseApp } from '@/main/firebase/client';

export class AuthorizationControllerDecorator implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly userRepository: UserRepositories,
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

      // Fetch user from db
      let dbUser = await this.userRepository.getByExternalId(decodedToken.uid);

      // If no user is found in db, create a new user and move on to the next step
      // TODO Move this to a usecase
      if (!dbUser) {
        const firebaseUser = await firebaseApp.auth().getUser(decodedToken.uid);

        await this.userRepository.add(
          User.create({
            displayName: firebaseUser.displayName ?? '',
            email: firebaseUser.email ?? '',
            firebaseId: decodedToken.uid,
          }),
        );

        dbUser = await this.userRepository.getByExternalId(decodedToken.uid);
        if (!dbUser) {
          return unauthorized({
            requiredAction: 'register-user',
          });
        }
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
