/**
 * Verifica si estamos en un entorno de navegador.
 * Esencial para evitar crashes en SSR (Astro, Next.js) o Node/Bun.
 */
function IS_BROWSER(): boolean {
  return typeof window !== 'undefined' && typeof navigator !== 'undefined';
}

// ─── Network & Connection ──────────────────────────────────────────
export function IS_ONLINE(): boolean {
  return IS_BROWSER() ? navigator.onLine : true; // Asumimos online en servidor
}

export function GET_CONNECTION_TYPE(): string | null {
  if (!IS_BROWSER()) return null;
  // @ts-ignore - connection es experimental pero muy soportado en Chrome/Android
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  return conn ? conn.effectiveType : null; // Ej: '4g', '3g', 'slow-2g'
}

// ─── Hardware & Device ─────────────────────────────────────────────
export function GET_LANGUAGE(): string {
  return IS_BROWSER() ? navigator.language : 'en-US';
}

export function GET_CORES(): number {
  return IS_BROWSER() ? navigator.hardwareConcurrency : 1;
}

export function IS_MOBILE(): boolean {
  if (!IS_BROWSER()) return false;
  // Detección básica por User-Agent (para casos simples)
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// ─── Vibration API ─────────────────────────────────────────────────
export function VIBRATE(pattern: number | number[]): boolean {
  if (IS_BROWSER() && 'vibrate' in navigator) {
    return navigator.vibrate(pattern);
  }
  return false;
}

// ─── Share API (Nativo de móviles) ─────────────────────────────────
export async function NATIVE_SHARE(data: { title?: string; text?: string; url?: string }): Promise<boolean> {
  if (IS_BROWSER() && navigator.share) {
    try {
      await navigator.share(data);
      return true;
    } catch (error) {
      // El usuario canceló el share o hubo error
      return false; 
    }
  }
  return false;
}