import { Router } from 'express';

import { marketRouter } from './market-routes';

import { otherRouter } from '@/main/routes/other-routes';

const router = Router();
router.use('/', otherRouter);
router.use('/api/grocery-shopping/v1/market', marketRouter);

export { router };
