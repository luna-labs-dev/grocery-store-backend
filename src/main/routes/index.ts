import { Router } from 'express';

import { marketRouter } from './market-routes';
import { shoppingEventRouter } from './shopping-event-routes';

import { otherRouter } from '@/main/routes/other-routes';
import { requireAuth } from '@clerk/express';
import { familyRouter } from './family-routes';

const router = Router();
router.use('/', otherRouter);
router.use('/api/grocery-shopping/v1/market', requireAuth(), marketRouter);
router.use('/api/grocery-shopping/v1/shopping-event', requireAuth(), shoppingEventRouter);
router.use('/api/grocery-shopping/v1/family', requireAuth(), familyRouter);

export { router };
