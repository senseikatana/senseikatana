// src/services/location.service.ts
// Stub implementation for location service
// TODO: Implement with actual database when Drizzle ORM is configured

import { z } from 'zod';

const locationSchema = z.object({
  aisle: z.string().min(1),
  rackNumber: z.number().positive(),
  level: z.number().int().min(0).max(6),
  position: z.number().positive(),
  nutCode: z.string().regex(/^NUT\d+$/),
});

export const assignProductToLocation = async (data: z.infer<typeof locationSchema>) => {
  const validation = locationSchema.safeParse(data);
  if (!validation.success) throw new Error(validation.error.message);

  const { aisle, rackNumber, level, position, nutCode } = validation.data;
  const rackCode = `${aisle}-${rackNumber}-${String(level).padStart(2, '0')}-${position}`;

  // TODO: Check if location is already occupied in database
  // TODO: Save to database

  return { success: true, rackCode };
};
