// services/FormatterService.ts
// import {
// 	CurrencyFormatOptions,
// 	DateFormatOptions,
// 	LocaleTypes,
// 	NumberFormatOptions,
// 	StringFormatOptions,
// } from "../index.type";

import { LocaleTypes } from "../dates/types";
import { CurrencyFormatOptions, DateFormatOptions } from "../types";

export default class FormatterService {
  private static instance: FormatterService;

  private constructor() {}

  static getInstance(): FormatterService {
    if (!FormatterService.instance) {
      FormatterService.instance = new FormatterService();
    }
    return FormatterService.instance;
  }

  // Formateo de números
  formatNumber(value: number, options: NumberFormatOptions = {}): string {
    const { locale = "en", digits = 2 } = options;
    return new Intl.NumberFormat(locale, {
      maximumFractionDigits: digits,
      minimumFractionDigits: digits,
    }).format(value);
  }

  // Formateo de fechas
  formatDate(options: DateFormatOptions = {}): string {
    const { date = new Date(), format = "medium", locale = "en" } = options;
    return date.toLocaleDateString(locale, { dateStyle: format });
  }

  // Formateo de strings
  upperCase(text: string, locale: LocaleTypes = "en"): string {
    return text.toLocaleUpperCase(locale).trim();
  }

  lowerCase(text: string, locale: LocaleTypes = "en"): string {
    return text.toLocaleLowerCase(locale).trim();
  }

  capitalize(text: string, locale: LocaleTypes = "en"): string {
    const trimmed = text.trim();
    return trimmed.charAt(0).toLocaleUpperCase(locale) + trimmed.slice(1);
  }

  // Formateo de moneda
  formatCurrency(options: CurrencyFormatOptions = {}): string {
    const { amount = 0, taxes = 0, currency = "USD", locale = "en" } = options;
    const total = taxes > 0 ? amount * (1 + taxes / 100) : amount;

    return total.toLocaleString(locale, {
      style: "currency",
      currency,
    });
  }

  // JSON helpers
  toJson(data: unknown): string {
    return JSON.stringify(data, null, 3);
  }

  fromJson<T = unknown>(json: string): T {
    return JSON.parse(json);
  }
}

const { formatCurrency, formatDate, formatNumber, lowerCase, upperCase }: FormatterService =
  FormatterService.getInstance();

console.log(formatCurrency({ amount: 2000.32, currency: "EUR", locale: "en", taxes: 0.21 }));
