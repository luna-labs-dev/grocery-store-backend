import { z } from 'zod';

export const removeProductFromCartRequestSchema = z.object({
  familyId: z.string().uuid(),
  shoppingEventId: z.string().uuid(),
  productId: z.string().uuid(),
});
