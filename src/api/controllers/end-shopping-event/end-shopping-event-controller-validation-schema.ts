import { z } from 'zod';

export const EndShoppingEventRequestSchema = z.object({
  shoppingEventId: z.string().uuid(),
  familyId: z.string().uuid(),
  totalPaid: z.number().min(0),
});
