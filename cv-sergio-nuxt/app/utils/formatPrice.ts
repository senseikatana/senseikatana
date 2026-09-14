/** Formats a price in the product's own currency for the current locale. */
export const formatPrice = (value: number, currency = 'EUR', locale = 'es'): string => {
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value)
  } catch {
    return `${value.toFixed(2)} ${currency}`
  }
}
