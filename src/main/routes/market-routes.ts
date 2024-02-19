import { Router } from 'express';
import { container } from 'tsyringe';

import { adaptRoute } from '../adapters';
import { injection } from '../di';

export const marketRouter = Router();

marketRouter.post('/new', adaptRoute(container.resolve(injection.controllers.newMarket)));
