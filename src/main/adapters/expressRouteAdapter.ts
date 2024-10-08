import { Request, Response } from 'express';

import { Controller } from '@/api/contracts';

export const adaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const requestData = {
      ...request.body,
      ...request.params,
      ...request.query,
      user: request.headers['x-user'],
      authToken: request.headers['x-authorization-token'],
    };

    const httpResponse = await controller.handle(requestData);

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      return response.status(httpResponse.statusCode).json(httpResponse.body);
    }
    return response.status(httpResponse.statusCode).json(httpResponse.body.toResult());
  };
};
