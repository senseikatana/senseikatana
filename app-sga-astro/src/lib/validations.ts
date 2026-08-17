// src/lib/validations.ts
import { z } from 'zod';

export const a4LabelSchema = z.object({
  nutCode: z.string().min(1, 'NUTCODE es requerido'),
  description: z.string().optional(),
  quantity: z.number().int().positive().optional(),
  location: z.string().optional(),
  batchNumber: z.string().optional(),
  expiryDate: z.string().optional(),
});

export type A4LabelData = z.infer<typeof a4LabelSchema>;
