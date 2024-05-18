import { z } from 'zod';

export const getMarketByIdRequestSchema = z.object({
  marketId: z.string().uuid(),
});
