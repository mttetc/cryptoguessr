import { getConfirmationToast } from '@/helpers';
import { useReadCryptoPrice } from '@/services/cryptoPrice/hooks';
import {
  useCreateScore,
  useReadScore,
  useUpdateScore,
} from '@/services/scores/hooks';
import useStore from '@/store';
import { useCallback } from 'react';

const useScore = () => {
  const anonymousId = useStore(state => state.anonymousId);
  const setAnonymousId = useStore(state => state.setAnonymousId);
  const selectedCrypto = useStore(state => state.selectedCrypto);
  const selectedCurrency = useStore(state => state.selectedCurrency);

  const { data = { score: 0 } } = useReadScore(anonymousId);

  const { data: price = 0 } = useReadCryptoPrice({
    params: { crypto: selectedCrypto, currency: selectedCurrency },
  });

  const { mutate: createScore } = useCreateScore({
    onSuccess: ({ id, score: newScore }) => {
      getConfirmationToast({ newScore, previousScore: data.score });
      setAnonymousId(id);
    },
  });
  const { mutate: updateScore } = useUpdateScore({
    onSuccess: ({ score: newScore }) => {
      getConfirmationToast({ newScore, previousScore: data.score });
    },
  });

  const onScoreUpdate = useCallback(
    async (direction: 'up' | 'down') => {
      const payload = {
        direction,
        price,
        crypto: selectedCrypto,
        currency: selectedCurrency,
      };

      if (anonymousId) {
        updateScore({
          id: anonymousId,
          ...payload,
        });
      } else {
        createScore(payload);
      }
    },
    [
      anonymousId,
      createScore,
      updateScore,
      price,
      selectedCrypto,
      selectedCurrency,
    ],
  );

  return {
    onScoreUpdate,
  };
};

export default useScore;
