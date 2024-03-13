import { z } from 'zod';

export const addMarketRequestSchema = z.object({
  user: z.string(),
  marketName: z.string().min(1),
});
