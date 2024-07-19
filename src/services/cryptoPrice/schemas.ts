import { z } from 'zod';

export const currencySchema = z.union([
  z.literal('usd'),
  z.literal('eur'),
  z.literal('gbp'),
  z.literal('jpy'),
  z.literal('cny'),
]);

export const cryptoSchema = z.union([
  z.literal('bitcoin'),
  z.literal('ethereum'),
  z.literal('dogecoin'),
  z.literal('ripple'),
  z.literal('litecoin'),
  z.literal('cardano'),
]);

const priceSchema = z.record(currencySchema, z.number());

export const readCryptoPriceSchema = z.record(cryptoSchema, priceSchema);
