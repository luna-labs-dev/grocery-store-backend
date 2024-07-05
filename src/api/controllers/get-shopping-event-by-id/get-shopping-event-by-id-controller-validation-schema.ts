import { z } from 'zod';

export const getShoppingEventByIdRequestSchema = z.object({
  familyId: z.string().uuid(),
  shoppingEventId: z.string().uuid(),
});
