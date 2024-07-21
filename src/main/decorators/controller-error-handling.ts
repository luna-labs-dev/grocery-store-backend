import { Controller, HttpError, serverError } from '@/api';
import { Constructor } from './decorator-types';

export const controllerErrorHandling = () => {
  return <T extends Constructor<Controller>>(target: T) => {
    const originalHandle = target.prototype.handle;

    target.prototype.handle = async function (request: any) {
      try {
        const httpResponse = await originalHandle.apply(this, [request]);

        return httpResponse;
      } catch (error) {
        console.log(error);
        return serverError(error as HttpError);
      }
    };
    return target;
  };
};
