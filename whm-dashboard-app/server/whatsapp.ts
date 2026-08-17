import { insertMessage, upsertChat } from './db';
import { broadcast } from './events';

export function whatsappConfigured(): boolean {
	return Boolean(process.env.WHATSAPP_TOKEN && process.env.WHATSAPP_PHONE_ID);
}

export async function whatsappSend(to: string, text: string): Promise<unknown> {
	const token = process.env.WHATSAPP_TOKEN;
	const phoneId = process.env.WHATSAPP_PHONE_ID;
	if (!token || !phoneId) {
		throw new Error('WhatsApp no está configurado (WHATSAPP_TOKEN / WHATSAPP_PHONE_ID).');
	}

	const version = process.env.WHATSAPP_VERSION ?? 'v22.0';
	const response = await fetch(
		`https://graph.facebook.com/${version}/${phoneId}/messages`,
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				messaging_product: 'whatsapp',
				to,
				type: 'text',
				text: { body: text },
			}),
		},
	);
	const data = (await response.json()) as { error?: { message?: string } };
	if (!response.ok) {
		throw new Error(data.error?.message ?? `Error de WhatsApp (${response.status}).`);
	}
	return data;
}

export function verifyWebhook(query: Record<string, unknown>): string | null {
	const mode = query['hub.mode'];
	const token = query['hub.verify_token'];
	const challenge = query['hub.challenge'];
	if (
		mode === 'subscribe' &&
		token === process.env.WHATSAPP_VERIFY_TOKEN &&
		typeof challenge === 'string'
	) {
		return challenge;
	}
	return null;
}

interface WhatsAppWebhookBody {
	entry?: Array<{
		changes?: Array<{
			value?: {
				messages?: Array<{ type?: string; from?: string; text?: { body?: string } }>;
				contacts?: Array<{ profile?: { name?: string } }>;
			};
		}>;
	}>;
}

export async function ingestWebhook(body: WhatsAppWebhookBody): Promise<void> {
	for (const entry of body.entry ?? []) {
		for (const change of entry.changes ?? []) {
			const value = change.value;
			if (!value) continue;
			for (const waMessage of value.messages ?? []) {
				if (waMessage.type !== 'text' || !waMessage.from) continue;
				const text = waMessage.text?.body ?? '';
				if (text.length === 0) continue;

				const contactName = value.contacts?.[0]?.profile?.name ?? null;
				const chat = await upsertChat({
					channel: 'whatsapp',
					externalId: waMessage.from,
					contactName,
					timestamp: Date.now(),
				});
				const saved = await insertMessage({
					chatId: chat.id,
					channel: 'whatsapp',
					direction: 'in',
					text,
					status: 'sent',
				});

				broadcast('message', saved);
				broadcast('chat', chat);
			}
		}
	}
}
