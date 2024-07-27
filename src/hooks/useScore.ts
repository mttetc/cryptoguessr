import {
  useCreateScore,
  useReadScore,
  useUpdateScore,
} from '@/services/scores/hooks';
import useStore from '@/store';
import { nanoid } from 'nanoid';

const useScore = () => {
  const { anonymousId, setAnonymousId } = useStore();
  const { data = { score: 0 } } = useReadScore(anonymousId, {
    enabled: !!anonymousId,
  });

  const { mutate: createScore } = useCreateScore({
    onSuccess: (_data, variables) => {
      setAnonymousId(variables.id);
    },
  });
  const { mutate: updateScore } = useUpdateScore();

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
