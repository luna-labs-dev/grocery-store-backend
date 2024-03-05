import { z } from 'zod';

export const getShoppingEventByIdRequestSchema = z.object({
  shoppingEventId: z.string().uuid(),
});
