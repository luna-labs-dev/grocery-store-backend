import { ZodSchema } from 'zod';

import { Controller, HttpResponse, InvalidParamError, badRequest } from '@/api';
import { Constructor } from './decorator-types';

export class ValidationControllerDecorator implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly schema: ZodSchema<any>,
  ) {}

  handle = async (request: any): Promise<HttpResponse> => {
    const validationResult = await this.schema.safeParseAsync(request);

    if (!validationResult.success) {
      const firstFieldWithError = validationResult.error.issues[0].path.join('.');
      const errorMessage = validationResult.error.issues[0].message;
      return badRequest(new InvalidParamError(firstFieldWithError, errorMessage));
    }

    const httpResponse = await this.controller.handle(validationResult.data);

    return httpResponse;
  };
}

export const controllerValidationHandler = (schema: ZodSchema<any>) => {
  return <T extends Constructor<Controller>>(target: T) => {
    const originalHandle = target.prototype.handle;

    target.prototype.handle = async (request: any) => {
      const validationResult = await schema.safeParseAsync(request);

      if (!validationResult.success) {
        const firstFieldWithError = validationResult.error.issues[0].path.join('.');
        const errorMessage = validationResult.error.issues[0].message;
        return badRequest(originalHandle(firstFieldWithError, errorMessage));
      }

      const httpResponse = await originalHandle.apply(this, [validationResult.data]);

      return httpResponse;
    };

    return target;
  };
};
