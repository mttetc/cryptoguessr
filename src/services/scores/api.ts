import { ZodError } from 'zod';
import {
  createScoreResponseSchema,
  readScoreResponseSchema,
  updateScoreResponseSchema,
} from './schemas';
import { CreateScorePayload, UpdateScorePayload } from './types';

export const readScore = async (id: string) => {
  const url = `${import.meta.env.VITE_AWS_SCORES_ENDPOINT!}/${id}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to create score');
  }

  const data = await response.json();
  const parsedRes = readScoreResponseSchema.safeParse(data);

  if (parsedRes.error) {
    throw new Error(ZodError.create(parsedRes.error.errors).message);
  }

  return parsedRes.data.score;
};

export const createScore = async (payload: CreateScorePayload) => {
  const url = import.meta.env.VITE_AWS_SCORES_ENDPOINT!;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to create score');
  }

  const data = await response.json();
  const parsedRes = createScoreResponseSchema.safeParse(data);

  if (parsedRes.error) {
    throw new Error(ZodError.create(parsedRes.error.errors).message);
  }

  return parsedRes.data;
};

export const updateScore = async (payload: UpdateScorePayload) => {
  const url = `${import.meta.env.VITE_AWS_SCORES_ENDPOINT!}/${payload.id}`;

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to create score');
  }

  const data = await response.json();
  const parsedRes = updateScoreResponseSchema.safeParse(data);

  if (parsedRes.error) {
    throw new Error(ZodError.create(parsedRes.error.errors).message);
  }

  return parsedRes.data;
};
