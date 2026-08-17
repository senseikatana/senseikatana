// Webhook de WhatsApp Business Cloud API (Meta).
//
// GET  → verificación del webhook (Meta envía hub.challenge)
// POST → mensajes entrantes de clientes → JARVIS responde automáticamente
import type { APIRoute } from 'astro';
import { askJarvisUseCase } from '@/infrastructure/ai';
import { loadWarehouseSnapshot } from '@/infrastructure/persistence/snapshot';
import { sendWhatsAppMessage, parseWebhookMessages } from '@/services/whatsapp.service';

// ============================================================
// Verificación del webhook (una sola vez al configurarlo en Meta)
// ============================================================
export const GET: APIRoute = async ({ url }) => {
  const mode = url.searchParams.get('hub.mode');
  const token = url.searchParams.get('hub.verify_token');
  const challenge = url.searchParams.get('hub.challenge');

  const verifyToken = import.meta.env.WHATSAPP_VERIFY_TOKEN || 'esinsa_jarvis_verify';

  if (mode === 'subscribe' && token === verifyToken) {
    return new Response(challenge ?? '', { status: 200 });
  }
  return new Response('Forbidden', { status: 403 });
};

// ============================================================
// Mensajes entrantes
// ============================================================
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const messages = parseWebhookMessages(body);

    // Lista blanca opcional de números autorizados (separados por coma)
    const whitelist = (import.meta.env.WHATSAPP_RECIPIENT_WHITELIST || '')
      .split(',')
      .map((n: string) => n.trim())
      .filter(Boolean);

    for (const msg of messages) {
      if (whitelist.length > 0 && !whitelist.includes(msg.from)) {
        console.log(`[whatsapp] Número no autorizado: ${msg.from}`);
        continue;
      }

      const data = await loadWarehouseSnapshot();
      const { reply, source } = await askJarvisUseCase.ask({ question: msg.text, data, lang: 'es' });
      const prefix = source === 'local' ? '' : '';
      await sendWhatsAppMessage(msg.from, `${prefix}${reply}`);
      console.log(`[whatsapp] Respondido a ${msg.from} (${source})`);
    }

    // Meta exige 200 siempre, incluso si no hay mensajes procesables
    return new Response(JSON.stringify({ received: true, processed: messages.length }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[whatsapp/webhook] Error:', error);
    // Aun así devolvemos 200 para que Meta no reintente en bucle
    return new Response(JSON.stringify({ received: true, processed: 0 }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
