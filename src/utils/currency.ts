import { CurrencyCode } from '../types';

export const BASE_EXCHANGE_RATES: Record<CurrencyCode, number> = {
  JPY: 1.0,        // Base reference currency (¥1 JPY)
  USD: 0.0065,     // 1 JPY = ~$0.0065 USD (~154 JPY/USD)
  EUR: 0.0060,     // 1 JPY = ~$0.0060 EUR
  GBP: 0.0051,     // 1 JPY = ~$0.0051 GBP
  CAD: 0.0090,     // 1 JPY = ~$0.0090 CAD
  AUD: 0.0099,     // 1 JPY = ~$0.0099 AUD
  KRW: 8.95,       // 1 JPY = ~8.95 KRW
  CNY: 0.047,      // 1 JPY = ~0.047 CNY
  AED: 0.024,      // 1 JPY = ~0.024 AED
  SGD: 0.0087,     // 1 JPY = ~0.0087 SGD
  TWD: 0.21,       // 1 JPY = ~0.21 TWD
  HKD: 0.051       // 1 JPY = ~0.051 HKD
};

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  JPY: '¥',
  USD: '$',
  EUR: '€',
  GBP: '£',
  CAD: 'CA$',
  AUD: 'AU$',
  KRW: '₩',
  CNY: 'CN¥',
  AED: 'AED ',
  SGD: 'S$',
  TWD: 'NT$',
  HKD: 'HK$'
};

export const CURRENCY_DECIMALS: Record<CurrencyCode, number> = {
  JPY: 0,
  KRW: 0,
  TWD: 0,
  USD: 2,
  EUR: 2,
  GBP: 2,
  CAD: 2,
  AUD: 2,
  CNY: 2,
  AED: 2,
  SGD: 2,
  HKD: 2
};

/**
 * Convert an amount in JPY minor units to the target currency
 */
export function convertFromJPY(amountJPY: number, targetCurrency: CurrencyCode): number {
  if (targetCurrency === 'JPY') return amountJPY;
  const rate = BASE_EXCHANGE_RATES[targetCurrency] || 1;
  return amountJPY * rate;
}

/**
 * Convert any currency amount to JPY minor units
 */
export function convertToJPY(amount: number, fromCurrency: CurrencyCode): number {
  if (fromCurrency === 'JPY') return amount;
  const rate = BASE_EXCHANGE_RATES[fromCurrency] || 1;
  return Math.round(amount / rate);
}

/**
 * Format a JPY price into the target currency string
 */
export function formatPrice(
  amountInJPY: number,
  targetCurrency: CurrencyCode = 'JPY',
  locale: string = 'en-US'
): string {
  const converted = convertFromJPY(amountInJPY, targetCurrency);
  const decimals = CURRENCY_DECIMALS[targetCurrency] ?? 2;
  const symbol = CURRENCY_SYMBOLS[targetCurrency] || '';

  const formattedNumber = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(converted);

  if (targetCurrency === 'JPY') {
    return `¥${formattedNumber}`;
  }
  if (targetCurrency === 'KRW') {
    return `₩${formattedNumber}`;
  }
  if (targetCurrency === 'EUR') {
    return `${formattedNumber} €`;
  }
  return `${symbol}${formattedNumber}`;
}
