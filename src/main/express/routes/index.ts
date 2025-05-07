import { Router } from 'express';

import { marketRouter } from './market-routes';
import { shoppingEventRouter } from './shopping-event-routes';

import { otherRouter } from '@/main/express/routes/other-routes';
import { authorizationMiddleware } from '../middlewares/authorization-middleware';
import { familyRouter } from './family-routes';
import { webhookRouter } from './webhooks';

const router = Router();
router.use('/', otherRouter);
router.use('/api/grocery-shopping/v1/market', authorizationMiddleware, marketRouter);
router.use('/api/grocery-shopping/v1/shopping-event', authorizationMiddleware, shoppingEventRouter);
router.use('/api/grocery-shopping/v1/family', authorizationMiddleware, familyRouter);
router.use('/api/grocery-shopping/v1/webhook', webhookRouter);

export { router };
