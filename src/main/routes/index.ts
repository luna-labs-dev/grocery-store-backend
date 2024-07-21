import { Router } from 'express';

import { marketRouter } from './market-routes';
import { shoppingEventRouter } from './shopping-event-routes';

import { otherRouter } from '@/main/routes/other-routes';
import { familyRouter } from './family-routes';

const router = Router();
router.use('/', otherRouter);
router.use('/api/grocery-shopping/v1/market', marketRouter);
router.use('/api/grocery-shopping/v1/shopping-event', shoppingEventRouter);
router.use('/api/grocery-shopping/v1/family', familyRouter);

export { router };
