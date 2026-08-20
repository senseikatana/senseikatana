import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Loader2, MessageCircle, Send, WifiOff } from 'lucide-react';
import { useI18n } from '../../i18n/LocaleProvider';
import { useMessaging } from '../../hooks/useMessaging';
import type { ChatMessage, MessagingChannel } from '../../lib/messaging';
import { useToast } from './Toast';

const CHANNELS: MessagingChannel[] = ['whatsapp', 'telegram'];

const LOCALE_TAG: Record<string, string> = {
	es: 'es-AR',
	en: 'en-US',
	ca: 'ca-ES',
	fr: 'fr-FR',
};

function formatTime(timestamp: number, locale: string): string {
	const date = new Date(timestamp);
	const now = new Date();
	const tag = LOCALE_TAG[locale] ?? 'es-AR';
	if (date.toDateString() === now.toDateString()) {
		return date.toLocaleTimeString(tag, { hour: '2-digit', minute: '2-digit' });
	}
	return date.toLocaleDateString(tag, { day: '2-digit', month: '2-digit' });
}

function initialsOf(name: string): string {
	return name
		.split(/\s+/)
		.slice(0, 2)
		.map((word) => word[0] ?? '')
		.join('')
		.toUpperCase();
}

export function MessagingView() {
	const { S, locale } = useI18n();
	const toast = useToast();
	const [channel, setChannel] = useState<MessagingChannel>('whatsapp');
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [input, setInput] = useState('');
	const threadRef = useRef<HTMLDivElement>(null);

	const { backendOnline, backend, chats, messages, loadingChats, loadMessages, send } =
		useMessaging(channel);

	const selected = chats.find((chat) => chat.id === selectedId) ?? chats[0] ?? null;
	const thread = selected ? (messages[selected.id] ?? []) : [];

	useEffect(() => {
		if (!selectedId && chats.length > 0) {
			setSelectedId(chats[0].id);
		}
	}, [chats, selectedId]);

	useEffect(() => {
		if (selected) void loadMessages(selected.id);
	}, [selected?.id]);

	useEffect(() => {
		const el = threadRef.current;
		if (el) el.scrollTop = el.scrollHeight;
	}, [thread.length]);

	const handleSend = async () => {
		if (!selected || !input.trim()) return;
		const text = input;
		setInput('');
		try {
			await send(selected, text);
		} catch {
			toast(S.sendFailed, 'error');
		}
	};

	const onComposerKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			void handleSend();
		}
	};

	const channelLabel = channel === 'telegram' ? S.channelTelegram : S.channelWhatsapp;

	return (
		<div className="flex h-full animate-fade-in flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
			<div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-slate-800">
				<div className="flex gap-1 rounded-lg bg-gray-100 p-1 dark:bg-slate-800">
					{CHANNELS.map((item) => (
						<button
							key={item}
							type="button"
							onClick={() => setChannel(item)}
							aria-pressed={channel === item}
							className={`rounded-md px-4 py-1.5 text-sm font-bold transition ${
								channel === item
									? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-indigo-400'
									: 'text-gray-500 hover:text-gray-800 dark:text-slate-400 dark:hover:text-white'
							}`}
						>
							{item === 'telegram' ? S.channelTelegram : S.channelWhatsapp}
						</button>
					))}
				</div>
				<span
					className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
						backendOnline
							? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300'
							: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300'
					}`}
				>
					<span
						className={`h-1.5 w-1.5 rounded-full ${
							backendOnline ? 'bg-emerald-500' : 'bg-rose-500'
						}`}
					/>
					{backendOnline ? S.backendOnline : S.backendOffline}
				</span>
			</div>

			{!backendOnline && (
				<div className="flex shrink-0 items-center gap-2 border-b border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-800 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300">
					<WifiOff size={16} className="shrink-0" />
					{S.backendOfflineHint}
				</div>
			)}

			{backendOnline && backend && !backend[channel] && (
				<div className="flex shrink-0 items-start gap-2 border-b border-indigo-200 bg-indigo-50 px-4 py-2.5 text-sm text-indigo-800 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300">
					<MessageCircle size={16} className="mt-0.5 shrink-0" />
					<span>
						{channel === 'telegram'
							? `${S.telegramNotConfigured} ${S.telegramSetupHint}`
							: `${S.whatsappNotConfigured} ${S.whatsappSetupHint}`}
					</span>
				</div>
			)}

			<div className="flex min-h-0 flex-1">
				<aside className="flex w-64 shrink-0 flex-col border-r border-gray-200 dark:border-slate-800 md:w-80">
					<div className="flex items-center gap-2 px-4 py-3">
						<h2 className="text-sm font-bold text-gray-900 dark:text-white">{channelLabel}</h2>
						<span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-gray-500 dark:bg-slate-800 dark:text-slate-400">
							{chats.length}
						</span>
					</div>
					<div className="flex-1 overflow-y-auto px-2 pb-2">
						{loadingChats && (
							<div className="flex items-center justify-center gap-2 py-8 text-sm text-gray-500 dark:text-slate-400">
								<Loader2 size={16} className="animate-spin" />
								{S.loading}
							</div>
						)}
						{!loadingChats && chats.length === 0 && (
							<p className="px-4 py-8 text-center text-sm text-gray-500 dark:text-slate-400">
								{S.noChats}
							</p>
						)}
						{chats.map((chat) => {
							const isSelected = selected?.id === chat.id;
							const preview = messages[chat.id]?.at(-1)?.text ?? '';
							return (
								<button
									key={chat.id}
									type="button"
									onClick={() => setSelectedId(chat.id)}
									aria-current={isSelected ? 'true' : undefined}
									className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${
										isSelected
											? 'bg-indigo-50 dark:bg-indigo-950/50'
											: 'hover:bg-gray-100 dark:hover:bg-slate-800'
									}`}
								>
									<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
										{initialsOf(chat.contactName ?? chat.externalId)}
									</span>
									<span className="min-w-0 flex-1">
										<span className="flex items-center justify-between gap-2">
											<span className="truncate text-sm font-bold text-gray-900 dark:text-white">
												{chat.contactName ?? chat.externalId}
											</span>
											<span className="shrink-0 text-[10px] text-gray-400 dark:text-slate-500">
												{formatTime(chat.lastMessageAt, locale)}
											</span>
										</span>
										<span className="block truncate text-xs text-gray-500 dark:text-slate-400">
											{preview || '—'}
										</span>
									</span>
								</button>
							);
						})}
					</div>
				</aside>

				<section className="flex min-w-0 flex-1 flex-col">
					{selected ? (
						<>
							<header className="flex shrink-0 items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-slate-800">
								<div>
									<h2 className="text-sm font-bold text-gray-900 dark:text-white">
										{selected.contactName ?? selected.externalId}
									</h2>
									<p className="text-xs text-gray-500 dark:text-slate-400">{channelLabel}</p>
								</div>
								<span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-gray-500 dark:bg-slate-800 dark:text-slate-400">
									{channelLabel}
								</span>
							</header>

							<div
								ref={threadRef}
								className="flex-1 space-y-2 overflow-y-auto bg-slate-50 p-4 dark:bg-slate-950/40"
							>
								{thread.map((message) => (
									<Bubble key={message.id} message={message} />
								))}
							</div>

							<form
								onSubmit={(event) => {
									event.preventDefault();
									void handleSend();
								}}
								className="flex shrink-0 items-end gap-2 border-t border-gray-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
							>
								<textarea
									value={input}
									onChange={(event) => setInput(event.target.value)}
									onKeyDown={onComposerKeyDown}
									placeholder={S.messagePlaceholder}
									disabled={!backendOnline}
									rows={1}
									className="max-h-28 flex-1 resize-none rounded-lg border border-gray-300 bg-white p-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100 dark:focus:ring-indigo-900/40"
								/>
								<button
									type="submit"
									disabled={!backendOnline || !input.trim()}
									aria-label={S.send}
									className="rounded-lg bg-indigo-600 p-2.5 text-white transition hover:bg-indigo-700 disabled:opacity-50"
								>
									<Send size={16} />
								</button>
							</form>
						</>
					) : (
						<div className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center text-gray-500 dark:text-slate-400">
							<MessageCircle size={40} className="text-gray-300 dark:text-slate-700" />
							<p className="text-sm">{S.chatEmpty}</p>
						</div>
					)}
				</section>
			</div>
		</div>
	);
}

function Bubble({ message }: { message: ChatMessage }) {
	const { S, locale } = useI18n();
	const isOut = message.direction === 'out';
	return (
		<div
			className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
				isOut
					? 'ml-auto bg-indigo-600 text-white'
					: 'border border-gray-200 bg-white text-gray-800 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100'
			}`}
		>
			<p className="whitespace-pre-wrap break-words">{message.text}</p>
			<p
				className={`mt-1 text-right text-[10px] leading-none ${
					isOut ? 'text-indigo-200' : 'text-gray-400 dark:text-slate-500'
				}`}
			>
				{message.status === 'failed' && <span className="mr-1 font-bold">{S.sendFailed} ·</span>}
				{formatTime(message.timestamp, locale)}
			</p>
		</div>
	);
}
