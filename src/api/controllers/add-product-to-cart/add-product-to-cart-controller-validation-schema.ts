import { z } from 'zod';

export const addProductToCartRequestSchema = z.object({
  user: z.string(),
  shoppingEventId: z.string().uuid(),
  name: z.string().min(1),
  amount: z.number().int().gt(0),
  price: z.number().gt(0),
  wholesaleMinAmount: z.number().int().gt(0).optional(),
  wholesalePrice: z.number().gt(0).optional(),
});
