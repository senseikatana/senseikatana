/**
 * Middleware global de Astro.
 *
 * PASSTHROUGH (intencional, por ahora):
 * La sesión de auth la emite el servicio hosteado de Neon (PUBLIC_NEON_AUTH_URL,
 * un origen distinto: *.neon.tech). Sus cookies NO llegan al origen de esta app,
 * así que validar sesión por cookie en /api/* aquí sería un falso seguro.
 *
 * Proteger los endpoints requeriría:
 *   1. Que el cliente obtenga un token de Neon y lo envíe en Authorization: Bearer
 *      a /api/*, y
 *   2. Que el middleware lo valide contra el servicio de Neon (o JWKS).
 * Ambos cambios tocan el flujo de auth (signin/signup/settings) y el bot de
 * WhatsApp (que llama a /api/ai server-to-server sin sesión).
 *
 * Cuando el auth esté consolidado, este passthrough es el punto único donde
 * conectar esa validación sin tocar cada endpoint.
 */
import type { APIContext, MiddlewareNext } from 'astro';

export const onRequest = async (context: APIContext, next: MiddlewareNext) => {
  return next();
};
