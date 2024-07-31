import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { readCryptoPrice } from '@/services/cryptoPrice/api';
import { cryptoPriceKeys } from '@/services/cryptoPrice/queryKeys';
import { ReadCryptoPriceParams } from '@/services/cryptoPrice/types';

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
    refetchOnWindowFocus: false,
    ...options,
  });
};
