import { z } from 'zod';

export const searchParamsSchema = z.object({
  take: z
    .string()
    .refine((val) => Number(val) >= 0, {
      message: `The 'take' parameter must be a positive number.`,
    })
    .optional(),
  skip: z
    .string()
    .refine((val) => Number(val) >= 0, {
      message: `The 'skip' parameter must be a positive number.`,
    })
    .optional(),
  search: z.string().default(''),
});
