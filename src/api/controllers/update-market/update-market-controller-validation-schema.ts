import { z } from 'zod';

export const updateMarketRequestSchema = z.object({
  name: z.string().min(1),
  marketId: z.string(),
});
