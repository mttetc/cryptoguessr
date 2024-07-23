import { CURRENCY_TO_LOCALE_MAPPING } from './consts';
import { Currency } from './services/cryptoPrice/types';

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
