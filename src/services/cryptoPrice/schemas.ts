import { z } from 'zod';

export const currencySchema = z.union([
  z.literal('USD'),
  z.literal('EUR'),
  z.literal('GBP'),
  z.literal('JPY'),
  z.literal('AUD'),
]);

export const cryptoSchema = z.union([
  z.literal('BTC'),
  z.literal('ETH'),
  z.literal('DOGE'),
  z.literal('BNB'),
  z.literal('ADA'),
]);

export const readCryptoPriceParamsSchema = z.object({
  crypto: cryptoSchema,
  currency: currencySchema,
});
export const readCryptoPriceSchema = z.object({
  price: z.string(),
  symbol: z.string(),
});
