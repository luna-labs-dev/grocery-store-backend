import { Controller, unauthorized } from '@/api';
import { firebaseApp } from '../firebase/client';
import { Constructor } from './decorator-types';

export const controllerAuthorizationHandling = () => {
  return <T extends Constructor<Controller>>(target: T) => {
    const originalHandle = target.prototype.handle;

    target.prototype.handle = async function (request: any) {
      try {
        const authToken = request.authToken;

        if (!authToken) {
          return unauthorized({
            details: 'x-authorization-token header is required',
          });
        }

        const decodedToken = await firebaseApp.auth().verifyIdToken(authToken);

        request.user = decodedToken.uid;

        console.log('teste');
        const httpResponse = await originalHandle.apply(this, [request]);

        return httpResponse;
      } catch (error) {
        console.log(error);

        return unauthorized();
      }
    };
    return target;
  };
};
