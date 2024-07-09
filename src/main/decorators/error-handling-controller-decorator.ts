import { Controller, HttpError, HttpResponse, IHttpError, serverError } from '@/api';
import { type Constructor } from './decorator-types';

export class ErrorHandlingControllerDecorator implements Controller {
  constructor(private readonly controller: Controller) {}

  handle = async (request: any): Promise<HttpResponse> => {
    try {
      const httpResponse = await this.controller.handle(request);

      if (httpResponse.statusCode === 500) {
        console.error(request);
      }

      return httpResponse;
    } catch (error) {
      console.error('an unhadled error occurred');
      console.error(error);
      return serverError(error as IHttpError);
    }
  };
}

export const controllerErrorHandler = () => {
  return <T extends Constructor<Controller>>(target: T) => {
    const originalHandle = target.prototype.handle;

    target.prototype.handle = async (request: any) => {
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
