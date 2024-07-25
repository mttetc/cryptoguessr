import { getConfirmationToast } from '@/helpers';
import {
  useCreateScore,
  useReadScore,
  useUpdateScore,
} from '@/services/scores/hooks';
import { scoresKeys } from '@/services/scores/queryKeys';
import { UpdateScoreResponse } from '@/services/scores/types';
import useStore from '@/store';
import { useQueryClient } from '@tanstack/react-query';
import { nanoid } from 'nanoid';

const useScore = () => {
  const queryClient = useQueryClient();
  const { anonymousId, setAnonymousId } = useStore();
  const { data = { score: 0 } } = useReadScore(anonymousId, {
    enabled: !!anonymousId,
  });

  const { mutate: createScore } = useCreateScore({
    onMutate: async variables => {
      const previousScore = queryClient.getQueryData<UpdateScoreResponse>(
        scoresKeys.list({ id: variables.id }),
      );

      getConfirmationToast({
        newScore: variables.score,
        previousScore: previousScore?.score ?? 0,
      });

      return previousScore;
    },
    onSuccess: (_data, variables) => {
      setAnonymousId(variables.id);
    },
  });
  const { mutate: updateScore } = useUpdateScore({
    onMutate: async variables => {
      const previousScore = queryClient.getQueryData<UpdateScoreResponse>(
        scoresKeys.list({ id: variables.id }),
      );

      getConfirmationToast({
        newScore: variables.score,
        previousScore: previousScore?.score ?? 0,
      });

      return previousScore;
    },
  });

  const handleScoreUpdate = (newScore: number) => {
    if (anonymousId) {
      updateScore({ id: anonymousId, score: newScore });
    } else {
      createScore({ id: nanoid(), score: newScore });
    }
  };

  return {
    score: data.score,
    handleScoreUpdate,
  };
};

export default useScore;
