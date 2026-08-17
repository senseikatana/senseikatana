/**
 * Shared date helpers — safe to import from both client and server bundles.
 */

/** Fecha de hoy en formato YYYY-MM-DD (usada en nombres de archivo de exportación). */
export function todayStamp(): string {
  return new Date().toISOString().split('T')[0];
}
