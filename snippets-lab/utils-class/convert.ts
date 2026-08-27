import { LOGGER } from "@/logger";




export default class CONVERTER {
  constructor() { 
    
  }
  /** Mathematical constant PI. */
static readonly PI = Math.PI || PI;

  static BYTES_TO_SIZE(bytes: number, decimals: number = 2): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
  }

  static CELSIUS_TO_FAHRENHEIT(value: number, reverse: boolean = false): number {
    return reverse ? (value - 32) / 1.8 : value * 1.8 + 32;
  }

  static CELSIUS_TO_KELVIN(value: number, reverse: boolean = false): number {
    return reverse ? value - 273.15 : value + 273.15;
  }

  static CURRENCY_FORMAT(
  value: string | number,
  currency: Currency = 'EUR',
  isCents: boolean = false,
  locale?: Locale,
): string {
  let numericValue = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(numericValue)) return '$0.00';
  const finalValue = isCents ? numericValue / 100 : numericValue;
  return new Intl.NumberFormat(locale = 'en-US' as Locale, {
    style: 'currency',
    currency: currency,
  }).format(finalValue);
  }

  static KG_TO_LBS(value: number, reverse: boolean = false, decimals: number = 2): number {
  const result = reverse ? value / KG_TO_LBS_FACTOR : value * KG_TO_LBS_FACTOR;
  return Number(result.toFixed(decimals));
  }

  static KM_TO_MILES(value: number, reverse: boolean = false, decimals: number = 2): number {
  const result = reverse ? value * KM_TO_MILES_FACTOR : value / KM_TO_MILES_FACTOR;
  return Number(result.toFixed(decimals));
  }
}



export const { CURRENCY_FORMAT, KG_TO_LBS } = CONVERTER

