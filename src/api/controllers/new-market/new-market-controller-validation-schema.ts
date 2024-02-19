import { z } from 'zod';

export const newMarketRequestSchema = z.object({
  user: z.string(),
  name: z.string().min(1),
});
