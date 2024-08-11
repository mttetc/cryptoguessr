import { ZodError } from 'zod';
import {
  createScoreResponseSchema,
  readScoreResponseSchema,
  updateScoreResponseSchema,
} from '@/services/scores/schemas';
import {
  CreateScorePayload,
  UpdateScorePayload,
} from '@/services/scores/types';

export const readScore = async (id: string) => {
  const url = `https://i34oy7qm0h.execute-api.eu-west-3.amazonaws.com/Prod/scores/${id}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to create score');
  }

  const data = await response.json();
  const parsedRes = readScoreResponseSchema.safeParse(data);

  if (parsedRes.error) {
    throw new Error(ZodError.create(parsedRes.error.errors).message);
  }

  return parsedRes.data;
};

export const createScore = async (payload: CreateScorePayload) => {
  const url =
    'https://i34oy7qm0h.execute-api.eu-west-3.amazonaws.com/Prod/scores/';

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

export const updateScore = async ({
  id,
  ...restPayload
}: UpdateScorePayload) => {
  const url = `https://i34oy7qm0h.execute-api.eu-west-3.amazonaws.com/Prod/scores/${id}`;

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(restPayload),
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

export const resetScore = async (id: string) => {
  const url = `https://i34oy7qm0h.execute-api.eu-west-3.amazonaws.com/Prod/scores/${id}/reset`;

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to reset score');
  }

  const data = await response.json();

  return data;
};
