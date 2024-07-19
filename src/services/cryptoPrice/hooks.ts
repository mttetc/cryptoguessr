import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { cryptoPriceKeys } from './queryKeys';
import { readCryptoPrice } from './api';
import { Currency, Crypto, ReadCryptoPrice } from './types';

type useReadBitcoinPriceProps<TContext = unknown> = {
  options?: Omit<
    UseQueryOptions<ReadCryptoPrice, Error, TContext>,
    'queryFn' | 'queryKey'
  >;
  crypto?: Crypto[];
  currency?: Currency;
};

export const useReadCryptoPrice = <TContext = unknown>({
  options,
  crypto = ['bitcoin'],
  currency = 'usd',
}: useReadBitcoinPriceProps<TContext>) => {
  return useQuery<ReadCryptoPrice, Error, TContext>({
    queryFn: () => readCryptoPrice({ crypto, currency }),
    queryKey: cryptoPriceKeys.list({ crypto, currency }),
    ...options,
  });
};
