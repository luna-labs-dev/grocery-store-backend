import { Router } from 'express';
import { container } from 'tsyringe';
import { adaptRoute } from '../adapters';
import { injection } from '../di';

export const familyRouter = Router();

familyRouter.post('/', adaptRoute(container.resolve(injection.controllers.addFamily)));
familyRouter.post('/join', adaptRoute(container.resolve(injection.controllers.joinFamily)));
