import { Binance, Bitcoin, Cardano, Dogecoin, Ethereum } from 'cryptocons';
import { ElementType } from 'react';
import { cryptoSchema, currencySchema } from './services/cryptoPrice/schemas';
import { Crypto, Currency } from './services/cryptoPrice/types';

export const COUNTDOWN = 6;
export const COUNTDOWN_INTERVAL = 1000;
export const cryptoOptions = cryptoSchema.options.map(crypto => crypto.value);
export const currencyOptions = currencySchema.options.map(
  currency => currency.value,
);
export const CURRENCY_TO_LOCALE_MAPPING: Record<Currency, string> = {
  USD: 'en-US',
  EUR: 'fr-FR',
  JPY: 'ja-JP',
  GBP: 'en-GB',
  AUD: 'en-AU',
};

export const CRYPTO_ICONS_MAPPING: Record<Crypto, ElementType> = {
  BTC: Bitcoin,
  ETH: Ethereum,
  BNB: Binance,
  ADA: Cardano,
  DOGE: Dogecoin,
};
