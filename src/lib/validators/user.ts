import { z } from 'zod';

export const CreateUserValidator = z.object({
  name: z.string(),
  email: z.string().email(),
  address: z.string().nullable(),
  birthdate: z
    .string()
    .date()
    .transform((str) => new Date(str))
    .nullable(),
  birthplace: z.string().nullable(),
});

export const EditUserValidator = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  address: z.string().optional(),
  birthdate: z
    .string()
    .date()
    .transform((str) => new Date(str))
    .optional(),
  birthplace: z.string().optional(),
});
