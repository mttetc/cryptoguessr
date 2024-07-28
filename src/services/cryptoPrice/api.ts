import { ReadCryptoPriceParams } from '@/services/cryptoPrice/types';
import { readCryptoPriceSchema } from '@/services/cryptoPrice/schemas';
import { ZodError } from 'zod';

export const readCryptoPrice = async (params: ReadCryptoPriceParams) => {
  const symbol = `${params.crypto}${params.currency === 'USD' ? 'USDT' : params.currency}`;
  const url = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to create score');
  }

  const data = await response.json();
  const parsedRes = readCryptoPriceSchema.safeParse(data);

  if (parsedRes.error) {
    throw new Error(ZodError.create(parsedRes.error.errors).message);
  }

  return parseFloat(parsedRes.data.price);
};
