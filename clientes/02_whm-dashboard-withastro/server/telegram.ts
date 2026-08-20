import { insertMessage, metaGet, metaSet, upsertChat } from './db';
import { broadcast } from './events';

const TG_API = 'https://api.telegram.org';

export function telegramConfigured(): boolean {
	return Boolean(process.env.TELEGRAM_BOT_TOKEN);
}

interface TelegramSendResult {
	message_id: number;
	chat: { id: number };
	text?: string;
}

export async function telegramSend(chatId: string, text: string): Promise<TelegramSendResult> {
	const token = process.env.TELEGRAM_BOT_TOKEN;
	if (!token) throw new Error('Telegram no está configurado (TELEGRAM_BOT_TOKEN).');

	const response = await fetch(`${TG_API}/bot${token}/sendMessage`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ chat_id: Number(chatId), text }),
	});
	const data = (await response.json()) as { ok: boolean; description?: string; result?: TelegramSendResult };
	if (!response.ok || !data.ok) {
		throw new Error(data.description ?? `Error de Telegram (${response.status}).`);
	}
	return data.result!;
}

interface TelegramUpdate {
	update_id: number;
	message?: {
		text?: string;
		caption?: string;
		date: number;
		chat: { id: number; title?: string };
		from?: { id: number; first_name?: string; username?: string };
	};
}

interface TelegramUpdatesResponse {
	ok: boolean;
	result?: TelegramUpdate[];
}

async function handleUpdate(update: TelegramUpdate): Promise<void> {
	const message = update.message;
	if (!message) return;
	const text = message.text ?? message.caption;
	if (typeof text !== 'string' || text.length === 0) return;

	const chatId = String(message.chat.id);
	const contactName = message.from?.first_name ?? message.chat.title ?? null;

	const chat = await upsertChat({
		channel: 'telegram',
		externalId: chatId,
		contactName,
		timestamp: message.date * 1000,
	});
	const saved = await insertMessage({
		chatId: chat.id,
		channel: 'telegram',
		direction: 'in',
		text,
		status: 'sent',
	});

	broadcast('message', saved);
	broadcast('chat', chat);
}

async function pollOnce(): Promise<void> {
	const token = process.env.TELEGRAM_BOT_TOKEN!;
	const offsetRaw = await metaGet('telegram_offset');
	const offset = offsetRaw === null ? 0 : Number(offsetRaw);

	const response = await fetch(`${TG_API}/bot${token}/getUpdates`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			timeout: 30,
			offset,
			allowed_updates: ['message'],
		}),
	});
	const data = (await response.json()) as TelegramUpdatesResponse;
	if (!response.ok || !data.ok) {
		throw new Error(`getUpdates falló (${response.status}).`);
	}

	for (const update of data.result ?? []) {
		await handleUpdate(update);
		await metaSet('telegram_offset', String(update.update_id + 1));
	}
}

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function startTelegramPolling(): Promise<void> {
	if (!telegramConfigured()) {
		console.log('[telegram] no configurado: polling desactivado.');
		return;
	}
	console.log('[telegram] polling iniciado.');
	for (;;) {
		try {
			await pollOnce();
		} catch (error) {
			console.error('[telegram] error de polling:', error);
			await sleep(3000);
		}
	}
}
