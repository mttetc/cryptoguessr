import { Crypto, Currency } from './types';

export const cryptoPriceKeys = {
  all: ['cryptoPrice'],
  list: (params: { crypto: Crypto[]; currency: Currency }) => [
    ...cryptoPriceKeys.lists(),
    params,
  ],
  lists: () => [...cryptoPriceKeys.all, 'list'],
};
