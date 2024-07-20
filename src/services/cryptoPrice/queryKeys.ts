import { ReadCryptoPriceParams } from './types';

export const cryptoPriceKeys = {
  all: ['cryptoPrice'],
  list: (params: ReadCryptoPriceParams) => [...cryptoPriceKeys.lists(), params],
  lists: () => [...cryptoPriceKeys.all, 'list'],
};
