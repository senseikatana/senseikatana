/**
 * API client — apunta al backend de Render en producción
 * y a localhost:3000 en desarrollo.
 *
 * En Astro, las variables de entorno públicas se exponen
 * con el prefijo PUBLIC_ y se leen en runtime del cliente
 * mediante import.meta.env.PUBLIC_API_URL.
 */

// Fallback a localhost si no hay variable definida
export const API_BASE =
  (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_API_URL) ||
  'http://localhost:3000'

export async function apiFetch(path: string, options?: RequestInit) {
  const url = `${API_BASE}${path}`
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
  })
  return res.json()
}
