// Endpoint principal de JARVIS para el dashboard web, el bot de WhatsApp y el
// webhook. Responde siempre desde la fuente de verdad (PostgreSQL / Neon), sin
// depender de que un navegador haya abierto la app.
import type { APIRoute } from 'astro';
import { askJarvisUseCase } from '@/infrastructure/ai';
import { loadWarehouseSnapshot } from '@/infrastructure/persistence/snapshot';
import { SUPPORTED_LANGS } from '@/shared/constants';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const question = String(body?.question ?? body?.context ?? '').trim();
    const lang = (SUPPORTED_LANGS as readonly string[]).includes(body?.lang) ? body.lang : 'es';

    if (!question) {
      return new Response(JSON.stringify({ error: 'Pregunta vacía' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await loadWarehouseSnapshot();

    const { reply, source } = await askJarvisUseCase.ask({ question, data, lang });

    return new Response(JSON.stringify({ success: true, reply, source }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[api/ai] Error:', error);
    return new Response(JSON.stringify({ error: 'Error interno de JARVIS' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
