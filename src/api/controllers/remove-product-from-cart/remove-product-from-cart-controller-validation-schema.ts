import { z } from 'zod';

export const removeProductFromCartRequestSchema = z.object({
  shoppingEventId: z.string().uuid(),
  productId: z.string().uuid(),
});
