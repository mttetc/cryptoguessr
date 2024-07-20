import useStore from '@/store';

export const useCountdownValue = () => {
  const countdown = useStore(state => state.countdown);
  return countdown;
};
