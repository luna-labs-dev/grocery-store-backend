import { z } from 'zod';

export const EndShoppingEventRequestSchema = z.object({
  shoppingEventId: z.string().uuid(),
});
