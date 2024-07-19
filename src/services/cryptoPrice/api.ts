import { Crypto, Currency } from '@/services/cryptoPrice/types';

type ReadCryptoPriceProps = {
  crypto?: Crypto[];
  currency?: Currency;
};

export const readCryptoPrice = async ({
  crypto = ['bitcoin'],
  currency = 'usd',
}: ReadCryptoPriceProps) => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${crypto.join(',')}&vs_currencies=${currency}`,
  );
  const data = await response.json();
  return data.bitcoin.usd;
};
