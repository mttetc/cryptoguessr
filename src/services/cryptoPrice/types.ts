import { z } from 'zod';
import { cryptoSchema, currencySchema, readCryptoPriceSchema } from './schemas';

export type Currency = z.infer<typeof currencySchema>;
export type Crypto = z.infer<typeof cryptoSchema>;
export type ReadCryptoPrice = z.infer<typeof readCryptoPriceSchema>;
