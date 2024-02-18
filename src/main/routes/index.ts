import { Router } from 'express';

import { otherRouter } from '@/main/routes/other-routes';

const router = Router();
router.use('/', otherRouter);

export { router };
