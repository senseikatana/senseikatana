/**
 * Formatea segundos a MM:SS
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

/**
 * Formatea número con decimales y separador opcional
 */
export function formatNumber(value: number, decimals = 0, useComma = false): string {
  const formatted = value.toFixed(decimals);
  return useComma ? formatted.replace(".", ",") : formatted;
}

/**
 * Formatea número como porcentaje
 */
export function formatPercent(value: number): string {
  return `${value}%`;
}

/**
 * Formatea número con sufijo (ej: 93+, 5°C)
 */
export function formatWithSuffix(value: number, suffix: string): string {
  return `${value}${suffix}`;
}
