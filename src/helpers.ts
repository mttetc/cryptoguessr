import { QueryClient } from '@tanstack/react-query';
import { CURRENCY_TO_LOCALE_MAPPING } from './consts';
import { Crypto, Currency } from './services/cryptoPrice/types';
import { cryptoPriceKeys } from './services/cryptoPrice/queryKeys';
import { toast } from 'sonner';

export const formatCurrency = (
  amount: number,
  currency: Currency,
  locale: string = CURRENCY_TO_LOCALE_MAPPING[currency] || navigator.language,
) => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency.toLocaleUpperCase(),
  });
  return formatter.format(amount);
};

export const getNewScore = ({
  direction,
  updatedPrice,
  price,
  currentScore,
}: {
  direction: 'up' | 'down';
  updatedPrice: number;
  price: number;
  currentScore: number;
}) => {
  let scoreChange = 0;

  if (
    (direction === 'down' && updatedPrice < price) ||
    (direction === 'up' && updatedPrice > price)
  ) {
    scoreChange = 1;
  } else {
    scoreChange = -1;
  }

  const newScore = currentScore + scoreChange;
  return Math.max(0, newScore);
};

export const invalidateCryptoPrices = async ({
  queryClient,
  selectedCrypto,
  selectedCurrency,
}: {
  queryClient: QueryClient;
  selectedCrypto: Crypto;
  selectedCurrency: Currency;
}) => {
  await queryClient.invalidateQueries({
    queryKey: cryptoPriceKeys.list({
      crypto: selectedCrypto,
      currency: selectedCurrency,
    }),
  });
};

export const getCryptoPrice = ({
  queryClient,
  selectedCrypto,
  selectedCurrency,
}: {
  queryClient: QueryClient;
  selectedCrypto: Crypto;
  selectedCurrency: Currency;
}) => {
  return (
    queryClient.getQueryData<number>(
      cryptoPriceKeys.list({
        crypto: selectedCrypto,
        currency: selectedCurrency,
      }),
    ) ?? 0
  );
};

export const getConfirmationToast = ({
  previousScore,
  newScore,
}: {
  previousScore: number;
  newScore: number;
}) => {
  if (previousScore >= newScore) {
    toast.error('Too bad!', {
      position: 'bottom-center',
      description: "You guessed wrong, but don't worry, you can try again!",
    });
    return;
  }
  toast.success('Nice!', {
    position: 'bottom-center',
    description: 'You guessed right, keep it up!',
  });
};
