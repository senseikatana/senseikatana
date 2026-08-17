import { useCallback, useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n/LocaleProvider';
import { idbGet, idbSet } from '../lib/idb';
import {
	api,
	type BackendStatus,
	type Chat,
	type ChatMessage,
	type MessagingChannel,
} from '../lib/messaging';
import { getSessionToken } from '../lib/supabase';

const MESSAGES_STORE = 'messages';
const API_BASE: string = import.meta.env.PUBLIC_API_BASE ?? 'http://localhost:8787';

function persistMessages(chatId: string, list: ChatMessage[]): void {
	void idbSet(MESSAGES_STORE, chatId, list);
}

export interface UseMessagingResult {
	backend: BackendStatus | null;
	backendOnline: boolean;
	chats: Chat[];
	messages: Record<string, ChatMessage[]>;
	loadingChats: boolean;
	loadMessages: (chatId: string) => Promise<void>;
	send: (chat: Chat, text: string) => Promise<ChatMessage>;
}

export function useMessaging(channel: MessagingChannel): UseMessagingResult {
	const { S } = useI18n();
	const [backend, setBackend] = useState<BackendStatus | null>(null);
	const [backendOnline, setBackendOnline] = useState(false);
	const [chats, setChats] = useState<Chat[]>([]);
	const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({});
	const [loadingChats, setLoadingChats] = useState(true);

	const channelRef = useRef(channel);
	channelRef.current = channel;

	const applyIncoming = useCallback((msg: ChatMessage) => {
		if (msg.channel !== channelRef.current) return;
		setMessages((prev) => {
			const list = prev[msg.chatId] ?? [];
			if (list.some((m) => m.id === msg.id)) return prev;
			const next = [...list, msg];
			persistMessages(msg.chatId, next);
			return { ...prev, [msg.chatId]: next };
		});
		setChats((prev) => {
			const existing = prev.find((c) => c.id === msg.chatId);
			if (existing) {
				return prev.map((c) =>
					c.id === msg.chatId ? { ...c, lastMessageAt: msg.timestamp } : c,
				);
			}
			return [
				{
					id: msg.chatId,
					channel: msg.channel,
					externalId: '',
					contactName: S.contactName,
					lastMessageAt: msg.timestamp,
				},
				...prev,
			];
		});
	}, [S]);

	const applyChat = useCallback((chat: Chat) => {
		if (chat.channel !== channelRef.current) return;
		setChats((prev) => {
			const existing = prev.find((c) => c.id === chat.id);
			if (existing) {
				return prev.map((c) => (c.id === chat.id ? { ...c, ...chat } : c));
			}
			return [chat, ...prev];
		});
	}, []);

	useEffect(() => {
		let disposed = false;
		let source: EventSource | null = null;

		const refreshChats = async () => {
			try {
				const list = await api.chats(channel);
				if (!disposed) {
					setChats(list);
					setLoadingChats(false);
				}
			} catch {
				if (!disposed) setLoadingChats(false);
			}
		};

		const refreshHealth = async () => {
			try {
				const status = await api.health();
				if (!disposed) {
					setBackend(status);
					setBackendOnline(true);
				}
			} catch {
				if (!disposed) setBackendOnline(false);
			}
		};

		const connect = async () => {
			const token = await getSessionToken();
			if (disposed) return;
			const url = token
				? `${API_BASE}/api/events?token=${encodeURIComponent(token)}`
				: `${API_BASE}/api/events`;
			const s = new EventSource(url);
			source = s;
			s.onopen = () => {
				if (!disposed) setBackendOnline(true);
			};
			s.onerror = () => {
				if (!disposed) setBackendOnline(false);
			};
			s.addEventListener('message', (event) => {
				try {
					applyIncoming(JSON.parse((event as MessageEvent<string>).data) as ChatMessage);
				} catch {
					/* evento malformado */
				}
			});
			s.addEventListener('chat', (event) => {
				try {
					applyChat(JSON.parse((event as MessageEvent<string>).data) as Chat);
				} catch {
					/* evento malformado */
				}
			});
		};

		void connect();
		void refreshHealth();
		void refreshChats();
		const poll = setInterval(() => {
			void refreshHealth();
		}, 15000);

		return () => {
			disposed = true;
			source?.close();
			clearInterval(poll);
		};
	}, [channel, applyIncoming, applyChat]);

	const loadMessages = useCallback(
		async (chatId: string) => {
			const cached = await idbGet<ChatMessage[]>(MESSAGES_STORE, chatId);
			if (cached) {
				setMessages((prev) => {
					const existing = prev[chatId];
					if (existing && existing.length >= cached.length) return prev;
					return { ...prev, [chatId]: cached };
				});
			}
			if (!backendOnline) return;
			try {
				const maxId = Math.max(0, ...(cached ?? []).map((m) => m.id));
				const fresh = await api.messages(chatId, maxId);
				if (fresh.length === 0) return;
				setMessages((prev) => {
					const merged = [...(prev[chatId] ?? []), ...fresh];
					persistMessages(chatId, merged);
					return { ...prev, [chatId]: merged };
				});
			} catch {
				/* sin conexión: seguimos con la caché */
			}
		},
		[backendOnline],
	);

	const send = useCallback(
		async (chat: Chat, text: string) => {
			const trimmed = text.trim();
			if (!trimmed) throw new Error(S.emptyMessage);

			const tempId = -Date.now();
			const optimistic: ChatMessage = {
				id: tempId,
				chatId: chat.id,
				channel,
				direction: 'out',
				text: trimmed,
				timestamp: Date.now(),
				status: 'sent',
			};
			setMessages((prev) => {
				const next = [...(prev[chat.id] ?? []), optimistic];
				persistMessages(chat.id, next);
				return { ...prev, [chat.id]: next };
			});
			setChats((prev) =>
				prev.map((c) => (c.id === chat.id ? { ...c, lastMessageAt: optimistic.timestamp } : c)),
			);

			try {
				const saved =
					channel === 'telegram'
						? await api.sendTelegram(chat.externalId, trimmed)
						: await api.sendWhatsapp(chat.externalId, trimmed);
				setMessages((prev) => {
					const next = (prev[chat.id] ?? []).map((m) => (m.id === tempId ? saved : m));
					persistMessages(chat.id, next);
					return { ...prev, [chat.id]: next };
				});
				return saved;
			} catch (error) {
				setMessages((prev) => {
					const next = (prev[chat.id] ?? []).map((m) =>
						m.id === tempId ? { ...m, status: 'failed' as const } : m,
					);
					persistMessages(chat.id, next);
					return { ...prev, [chat.id]: next };
				});
				throw error;
			}
		},
		[channel, S],
	);

	return { backend, backendOnline, chats, messages, loadingChats, loadMessages, send };
}
