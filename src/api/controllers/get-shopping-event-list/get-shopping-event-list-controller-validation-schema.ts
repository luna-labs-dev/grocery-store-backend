import { z } from 'zod';

import { validShoppingEventStatus } from '@/domain';

export const getShoppingEventListRequestSchema = z.object({
  status: z.enum(validShoppingEventStatus).optional(),
  period: z
    .object({
      start: z.date(),
      end: z.date(),
    })
    .optional(),
  pageIndex: z.coerce.number().min(0).default(0),
  pageSize: z.coerce.number().min(1).max(50).default(10),
  orderBy: z.enum(['createdAt']).default('createdAt'),
  orderDirection: z.enum(['desc', 'asc']).default('desc'),
});
