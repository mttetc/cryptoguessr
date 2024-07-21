import { ReadCryptoPriceParams } from '@/services/cryptoPrice/types';
import { readCryptoPriceSchema } from './schemas';
import { ZodError } from 'zod';

export const readCryptoPrice = async (params: ReadCryptoPriceParams) => {
  const symbol = `${params.crypto}${params.currency === 'USD' ? 'USDT' : params.currency}`;
  const url = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`;

  const response = await fetch(url);
  const data = await response.json();

  const parsedRes = readCryptoPriceSchema.safeParse(data);

  if (parsedRes.error) {
    return ZodError.create(parsedRes.error.errors);
  }

  return parseFloat(parsedRes.data.price);
};
