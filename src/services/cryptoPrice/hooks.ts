import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { readCryptoPrice } from './api';
import { cryptoPriceKeys } from './queryKeys';
import { ReadCryptoPriceParams } from './types';

type useReadBitcoinPriceProps = {
  options?: Omit<
    UseQueryOptions<number, Error, number>,
    'queryFn' | 'queryKey'
  >;
  params: ReadCryptoPriceParams;
};

export const useReadCryptoPrice = ({
  options,
  params,
}: useReadBitcoinPriceProps) => {
  return useQuery<number, Error, number>({
    queryFn: () => readCryptoPrice(params),
    queryKey: cryptoPriceKeys.list(params),
    retry: false,
    refetchOnWindowFocus: false,
    ...options,
  });
};
