import { cryptoPriceKeys } from '@/services/cryptoPrice/queryKeys';
import {
  useCreateScore,
  useReadScore,
  useUpdateScore,
} from '@/services/scores/hooks';
import useStore from '@/store';
import { useQueryClient } from '@tanstack/react-query';
import { nanoid } from 'nanoid';

const useScore = () => {
  const { anonymousId, setAnonymousId, selectedCrypto, selectedCurrency } =
    useStore();
  const queryClient = useQueryClient();
  const { data: score = 0, ...readScoreQuery } = useReadScore(anonymousId, {
    enabled: !!anonymousId,
  });
  const { mutate: createScore } = useCreateScore({
    onSuccess: (_data, variables) => {
      setAnonymousId(variables.id);
    },
  });
  const { mutate: updateScore } = useUpdateScore();

  const invalidateCryptoPrices = async () => {
    await queryClient.invalidateQueries({
      queryKey: cryptoPriceKeys.list({
        crypto: selectedCrypto,
        currency: selectedCurrency,
      }),
    });
  };

  const getUpdatedPrice = () => {
    return (
      queryClient.getQueryData<number>(
        cryptoPriceKeys.list({
          crypto: selectedCrypto,
          currency: selectedCurrency,
        }),
      ) ?? 0
    );
  };

  const handleScoreUpdate = (newScore: number) => {
    if (anonymousId) {
      updateScore({ id: anonymousId, score: newScore });
    } else {
      createScore({ id: nanoid(), score: newScore });
    }
  };

  return {
    score,
    readScoreQuery,
    invalidateCryptoPrices,
    getUpdatedPrice,
    handleScoreUpdate,
  };
};

export default useScore;
