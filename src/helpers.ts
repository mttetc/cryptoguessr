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
