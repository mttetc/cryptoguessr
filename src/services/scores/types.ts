import { z } from 'zod';
import {
  createScorePayloadSchema,
  createScoreResponseSchema,
  readScoreResponseSchema,
  updateScorePayloadSchema,
  updateScoreResponseSchema,
} from '@/services/scores/schemas';

export type ReadScoreResponse = z.infer<typeof readScoreResponseSchema>;

export type CreateScorePayload = z.infer<typeof createScorePayloadSchema>;
export type CreateScoreResponse = z.infer<typeof createScoreResponseSchema>;

export type UpdateScorePayload = z.infer<typeof updateScorePayloadSchema>;
export type UpdateScoreResponse = z.infer<typeof updateScoreResponseSchema>;
