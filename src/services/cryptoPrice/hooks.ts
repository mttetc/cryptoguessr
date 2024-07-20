import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { readCryptoPrice } from './api';
import { cryptoPriceKeys } from './queryKeys';
import { ReadCryptoPriceParams } from './types';
import { ZodError } from 'zod';

type useReadBitcoinPriceProps = {
  options?: Omit<
    UseQueryOptions<
      number | ZodError<unknown>,
      Error,
      number | ZodError<unknown>
    >,
    'queryFn' | 'queryKey'
  >;
  params: ReadCryptoPriceParams;
};

export const useReadCryptoPrice = ({
  options,
  params,
}: useReadBitcoinPriceProps) => {
  return useQuery<
    number | ZodError<unknown>,
    Error,
    number | ZodError<unknown>
  >({
    queryFn: () => readCryptoPrice(params),
    queryKey: cryptoPriceKeys.list(params),
    retry: false,
    refetchOnWindowFocus: false,
    ...options,
  });
};
