import { z } from 'zod';

const scoreSchema = z.object({
  score: z.number(),
});

const payloadSchema = z
  .object({
    id: z.string(),
  })
  .merge(scoreSchema);

export const readScoreResponseSchema = scoreSchema;

export const createScorePayloadSchema = payloadSchema;
export const createScoreResponseSchema = scoreSchema;

export const updateScorePayloadSchema = payloadSchema;
export const updateScoreResponseSchema = scoreSchema;
