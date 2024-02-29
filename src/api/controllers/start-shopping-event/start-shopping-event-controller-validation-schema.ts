import { z } from 'zod';

export const StartShoppingEventRequestSchema = z.object({
  user: z.string(),
  marketId: z.string().uuid(),
});
