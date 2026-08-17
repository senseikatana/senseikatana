import { getSessionToken } from './supabase';

export type MessagingChannel = 'whatsapp' | 'telegram';

export interface ChatMessage {
	id: number;
	chatId: string;
	channel: MessagingChannel;
	direction: 'in' | 'out';
	text: string;
	timestamp: number;
	status: 'sent' | 'failed';
}

export interface Chat {
	id: string;
	channel: MessagingChannel;
	externalId: string;
	contactName: string | null;
	lastMessageAt: number;
}

export interface BackendStatus {
	ok: boolean;
	telegram: boolean;
	whatsapp: boolean;
	time: number;
}

const API_BASE: string = import.meta.env.PUBLIC_API_BASE ?? 'http://localhost:8787';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
	const token = await getSessionToken();
	const headers: Record<string, string> = { 'Content-Type': 'application/json' };
	if (token) headers.Authorization = `Bearer ${token}`;
	const response = await fetch(`${API_BASE}${path}`, { headers, ...init });
	const data = (await response.json().catch(() => ({}))) as { error?: string } & T;
	if (!response.ok) {
		throw new Error(data.error ?? `Error del servidor (${response.status}).`);
	}
	return data;
}

export const api = {
	async health(): Promise<BackendStatus> {
		return request('/api/health');
	},

	async chats(channel: MessagingChannel): Promise<Chat[]> {
		return request(`/api/chats?channel=${channel}`);
	},

	async messages(chatId: string, afterId = 0): Promise<ChatMessage[]> {
		return request(`/api/messages?chatId=${encodeURIComponent(chatId)}&afterId=${afterId}`);
	},

	async sendTelegram(chatId: string, text: string): Promise<ChatMessage> {
		return request('/api/telegram/send', {
			method: 'POST',
			body: JSON.stringify({ chatId, text }),
		});
	},

	async sendWhatsapp(to: string, text: string): Promise<ChatMessage> {
		return request('/api/whatsapp/send', {
			method: 'POST',
			body: JSON.stringify({ to, text }),
		});
	},
};
