import useStore from '@/store';

export const useStartCountdown = () => {
  const startCountdown = useStore(state => state.startCountdown);
  const isActive = useStore(state => state.isCountdownActive);
  return { startCountdown, isActive };
};
