import { Controller, HttpResponse, IHttpError, serverError } from '@/api';

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
