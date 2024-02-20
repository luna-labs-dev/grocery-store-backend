import { Router } from 'express';
import { container } from 'tsyringe';

import { adaptRoute } from '../adapters';
import { injection } from '../di';

export const marketRouter = Router();

marketRouter.post('/', adaptRoute(container.resolve(injection.controllers.newMarket)));
marketRouter.put('/:marketId', adaptRoute(container.resolve(injection.controllers.updateMarket)));
