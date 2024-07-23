import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { createScore, readScore, updateScore } from './api';
import { scoresKeys } from './queryKeys';
import {
  CreateScorePayload,
  CreateScoreResponse,
  UpdateScorePayload,
  UpdateScoreResponse,
} from './types';

export const useReadScore = (
  id: string | undefined,
  options?: Omit<
    UseQueryOptions<number, Error, number>,
    'queryFn' | 'queryKey'
  >,
) => {
  return useQuery<number, Error, number>({
    queryFn: () => readScore(id!),
    queryKey: scoresKeys.list({ id: id! }),
    retry: false,
    refetchOnWindowFocus: false,
    ...options,
    enabled: !!id,
  });
};

export const useCreateScore = (
  options?: Omit<
    UseMutationOptions<CreateScoreResponse, Error, CreateScorePayload>,
    'mutationFn'
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation<CreateScoreResponse, Error, CreateScorePayload>({
    mutationFn: createScore,
    ...options,
    onSettled: async (...args) => {
      const { id } = args[2];
      queryClient.invalidateQueries({
        queryKey: scoresKeys.list({ id }),
      });
      if (options?.onSettled) await options.onSettled(...args);
    },
  });
};

export const useUpdateScore = (
  options?: Omit<
    UseMutationOptions<UpdateScoreResponse, Error, UpdateScorePayload>,
    'mutationFn'
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation<UpdateScoreResponse, Error, UpdateScorePayload>({
    mutationFn: updateScore,
    ...options,
    onSettled: async (...args) => {
      const { id } = args[2];
      queryClient.invalidateQueries({
        queryKey: scoresKeys.list({ id }),
      });
      if (options?.onSettled) await options.onSettled(...args);
    },
  });
};
