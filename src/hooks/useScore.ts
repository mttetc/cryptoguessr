import { getConfirmationToast, getNewScore } from '@/helpers';
import { useReadCryptoPrice } from '@/services/cryptoPrice/hooks';
import {
  useCreateScore,
  useReadScore,
  useUpdateScore,
} from '@/services/scores/hooks';
import useStore from '@/store';
import { useQueryClient } from '@tanstack/react-query';
import { nanoid } from 'nanoid';
import { useCallback } from 'react';

const useScore = () => {
  const queryClient = useQueryClient();

  const anonymousId = useStore(state => state.anonymousId);
  const setAnonymousId = useStore(state => state.setAnonymousId);
  const selectedCrypto = useStore(state => state.selectedCrypto);
  const selectedCurrency = useStore(state => state.selectedCurrency);

  const { data: cryptoPrice = 0 } = useReadCryptoPrice({
    params: { crypto: selectedCrypto, currency: selectedCurrency },
  });

  const { data = { score: 0 } } = useReadScore(anonymousId, {
    enabled: !!anonymousId,
  });

  const { mutate: createScore } = useCreateScore({
    onSuccess: (_data, variables) => {
      setAnonymousId(variables.id);
    },
  });
  const { mutate: updateScore } = useUpdateScore();

  const onScoreUpdate = useCallback(
    async (direction: 'up' | 'down') => {
      const newScore = await getNewScore({
        score: data.score,
        queryClient,
        cryptoPrice,
        direction,
      });

      getConfirmationToast({
        newScore,
        previousScore: data.score,
      });
      const isSameScore = newScore === data.score;
      if (!isSameScore) {
        if (anonymousId) {
          updateScore({ id: anonymousId, score: newScore });
        } else {
          createScore({ id: nanoid(), score: newScore });
        }
      }
    },
    [
      data.score,
      queryClient,
      cryptoPrice,
      anonymousId,
      createScore,
      updateScore,
    ],
  );

  return {
    onScoreUpdate,
  };
};

export default useScore;
