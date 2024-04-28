import { z } from 'zod';

export const CreateProductValidator = z.object({
  name: z.string(),
  description: z.string(),
  stock: z.number(),
  price: z.number(),
});

export const EditProductValidator = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  stock: z.number().optional(),
  price: z.number().optional(),
});
