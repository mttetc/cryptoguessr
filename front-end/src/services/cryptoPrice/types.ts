import { z } from 'zod';
import {
  cryptoSchema,
  currencySchema,
  readCryptoPriceParamsSchema,
  readCryptoPriceSchema,
} from '@/services/cryptoPrice/schemas';

export type Currency = z.infer<typeof currencySchema>;
export type Crypto = z.infer<typeof cryptoSchema>;

export type ReadCryptoPriceParams = z.infer<typeof readCryptoPriceParamsSchema>;
export type ReadCryptoPrice = z.infer<typeof readCryptoPriceSchema>;
