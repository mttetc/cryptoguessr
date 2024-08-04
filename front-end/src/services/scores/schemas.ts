import { z } from 'zod';

const scoreSchema = z.object({
  score: z.number(),
  id: z.string(),
});

const payloadSchema = z.object({
  id: z.string(),
  currency: z.string(),
  crypto: z.string(),
  price: z.number(),
  direction: z.enum(['up', 'down']),
});

export const readScoreResponseSchema = scoreSchema;

export const createScorePayloadSchema = payloadSchema.omit({ id: true });
export const createScoreResponseSchema = scoreSchema;

export const updateScorePayloadSchema = payloadSchema;
export const updateScoreResponseSchema = scoreSchema;
