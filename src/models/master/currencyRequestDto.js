import { z } from 'zod';

export const currencyRequestSchema = z.object({
  idx: z.number().optional(),
  currencyCode: z.string().min(3, "currency Code is required."),
  currencyName: z.string().min(3, "currency Name is required."),
});



