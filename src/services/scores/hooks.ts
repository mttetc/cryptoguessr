import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { createScore, readScore, updateScore } from '@/services/scores/api';
import { scoresKeys } from '@/services/scores/queryKeys';
import {
  CreateScorePayload,
  CreateScoreResponse,
  ReadScoreResponse,
  UpdateScorePayload,
  UpdateScoreResponse,
} from '@/services/scores/types';

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
    onMutate: async variables => {
      if (options?.onMutate) {
        options.onMutate(variables);
      }

      await queryClient.cancelQueries({
        queryKey: scoresKeys.list({ id: variables.id }),
      });

      const previousScore = queryClient.getQueryData<CreateScoreResponse>(
        scoresKeys.list({ id: variables.id }),
      );

      queryClient.setQueryData<ReadScoreResponse>(
        scoresKeys.list({ id: variables.id }),
        {
          ...previousScore,
          score: variables.score,
        },
      );

      return previousScore;
    },
    onError: (err, variables, context) => {
      if (context) {
        queryClient.setQueryData(
          scoresKeys.list({ id: variables.id }),
          context,
        );
      }

      if (options?.onError) {
        options.onError(err, variables, context);
      }
    },
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
    onMutate: async variables => {
      if (options?.onMutate) {
        options.onMutate(variables);
      }

      await queryClient.cancelQueries({
        queryKey: scoresKeys.list({ id: variables.id }),
      });

      const previousScore = queryClient.getQueryData<UpdateScoreResponse>(
        scoresKeys.list({ id: variables.id }),
      );

      queryClient.setQueryData<ReadScoreResponse>(
        scoresKeys.list({ id: variables.id }),
        {
          ...previousScore,
          score: variables.score,
        },
      );

      return previousScore;
    },
    onError: (err, variables, context) => {
      if (context) {
        queryClient.setQueryData(
          scoresKeys.list({ id: variables.id }),
          context,
        );
      }

      if (options?.onError) {
        options.onError(err, variables, context);
      }
    },
    onSettled: async (...args) => {
      const { id } = args[2];
      queryClient.invalidateQueries({
        queryKey: scoresKeys.list({ id }),
      });
      if (options?.onSettled) await options.onSettled(...args);
    },
  });
};
