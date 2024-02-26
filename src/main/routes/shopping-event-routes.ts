import { Router } from 'express';
import { container } from 'tsyringe';

import { adaptRoute } from '../adapters';
import { injection } from '../di';

export const shoppingEventRouter = Router();

shoppingEventRouter.post(
  '/',
  adaptRoute(container.resolve(injection.controllers.startShoppingEvent)),
);
