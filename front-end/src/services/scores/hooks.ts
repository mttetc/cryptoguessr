import {
  createScore,
  readScore,
  resetScore,
  updateScore,
} from '@/services/scores/api';
import { scoresKeys } from '@/services/scores/queryKeys';
import {
  CreateScorePayload,
  CreateScoreResponse,
  ReadScoreResponse,
  UpdateScorePayload,
  UpdateScoreResponse,
} from '@/services/scores/types';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { cryptoPriceKeys } from '../cryptoPrice/queryKeys';

export const useReadScore = (
  id: string | undefined,
  options?: Omit<
    UseQueryOptions<ReadScoreResponse, Error, ReadScoreResponse>,
    'queryFn' | 'queryKey'
  >,
) => {
  return useQuery<ReadScoreResponse, Error, ReadScoreResponse>({
    queryFn: () => readScore(id!),
    queryKey: scoresKeys.list({ id: id! }),
    ...options,
    enabled: !!id,
  });
};

export const useCreateScore = (
  options?: Omit<
    UseMutationOptions<
      CreateScoreResponse,
      Error,
      CreateScorePayload,
      CreateScoreResponse
    >,
    'mutationFn'
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation<
    CreateScoreResponse,
    Error,
    CreateScorePayload,
    CreateScoreResponse
  >({
    mutationFn: createScore,
    ...options,
    onSettled: async (...args) => {
      queryClient.invalidateQueries({
        queryKey: scoresKeys.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: cryptoPriceKeys.lists(),
      });
      if (options?.onSettled) await options.onSettled(...args);
    },
  });
};

export const useUpdateScore = (
  options?: Omit<
    UseMutationOptions<
      UpdateScoreResponse,
      Error,
      UpdateScorePayload,
      UpdateScoreResponse
    >,
    'mutationFn'
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateScoreResponse,
    Error,
    UpdateScorePayload,
    UpdateScoreResponse
  >({
    mutationFn: updateScore,
    ...options,
    onSettled: async (...args) => {
      queryClient.invalidateQueries({
        queryKey: scoresKeys.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: cryptoPriceKeys.lists(),
      });
      if (options?.onSettled) await options.onSettled(...args);
    },
  });
};

export const useResetScore = (
  options?: Omit<UseMutationOptions<void, Error, string, void>, 'mutationFn'>,
) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string, void>({
    mutationFn: resetScore,
    ...options,
    onSettled: async (...args) => {
      queryClient.invalidateQueries({
        queryKey: scoresKeys.lists(),
      });
      if (options?.onSettled) await options.onSettled(...args);
    },
  });
};
