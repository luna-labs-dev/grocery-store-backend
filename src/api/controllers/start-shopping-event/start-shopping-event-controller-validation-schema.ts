import { z } from 'zod';

export const StartShoppingEventRequestSchema = z.object({
  user: z.string(),
  familyId: z.string().uuid(),
  marketId: z.string().uuid(),
});
