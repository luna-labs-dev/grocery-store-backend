import { z } from 'zod';

export const addMarketRequestSchema = z.object({
  user: z.string(),
  name: z.string().min(1),
});
