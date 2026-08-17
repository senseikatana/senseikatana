/**
 * Cliente de WhatsApp Business Cloud API (Meta).
 *
 * Requiere en el entorno:
 *  - WHATSAPP_TOKEN: token permanente de la app de Meta
 *  - WHATSAPP_PHONE_NUMBER_ID: ID del número de teléfono de la app
 */
const GRAPH_API_VERSION = 'v21.0';

export interface IncomingWhatsAppMessage {
  from: string;      // número del remitente (formato internacional sin +)
  text: string;      // contenido del mensaje
  messageId: string;
  timestamp: string;
}

export async function sendWhatsAppMessage(to: string, text: string): Promise<void> {
  const token = import.meta.env.WHATSAPP_TOKEN;
  const phoneId = import.meta.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!token || !phoneId) {
    console.warn('[whatsapp] Credenciales no configuradas, mensaje no enviado.');
    return;
  }

  const res = await fetch(`https://graph.facebook.com/${GRAPH_API_VERSION}/${phoneId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to,
      type: 'text',
      text: { preview_url: false, body: text.slice(0, 4096) },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`WhatsApp API ${res.status}: ${body.slice(0, 200)}`);
  }
}

/**
 * Extrae los mensajes de texto entrantes del payload del webhook de Meta.
 */
export function parseWebhookMessages(body: any): IncomingWhatsAppMessage[] {
  const messages: IncomingWhatsAppMessage[] = [];
  try {
    for (const entry of body?.entry ?? []) {
      for (const change of entry?.changes ?? []) {
        const value = change?.value;
        for (const msg of value?.messages ?? []) {
          if (msg?.type === 'text' && msg?.text?.body) {
            messages.push({
              from: msg.from,
              text: msg.text.body,
              messageId: msg.id,
              timestamp: msg.timestamp,
            });
          }
        }
      }
    }
  } catch (err) {
    console.error('[whatsapp] Error parseando webhook:', err);
  }
  return messages;
}
