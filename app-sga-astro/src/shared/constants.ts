/**
 * Shared constants — safe to import from both client and server bundles.
 * No node: imports here.
 */

export const APP_NAME = 'ESINSA Gasket';

export const SUPPORTED_LANGS = ['es', 'en', 'ca'] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

/** Umbral de stock bajo para alertas de JARVIS (env JARVIS_LOW_STOCK_THRESHOLD, default 100). */
export const LOW_STOCK_THRESHOLD = Number(import.meta.env.JARVIS_LOW_STOCK_THRESHOLD) || 100;
