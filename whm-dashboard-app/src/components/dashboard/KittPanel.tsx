import { useEffect, useRef, useState, type KeyboardEvent, type ChangeEvent } from 'react';
import {
	Bot,
	FileSpreadsheet,
	Loader2,
	MessageSquare,
	Mic,
	MicOff,
	Paperclip,
	Send,
	Volume2,
	VolumeX,
	X,
} from 'lucide-react';
import { useI18n } from '../../i18n/LocaleProvider';
import type { CollectionsState } from '../../hooks/useCollections';
import { useKitt } from '../../hooks/useKitt';

function ModelStatus({ model }: { model: ReturnType<typeof useKitt>['model'] }) {
	const { S } = useI18n();
	if (model === null) {
		return (
			<p className="text-[11px] text-slate-400 dark:text-slate-500">{S.kittBackendOffline}</p>
		);
	}
	if (!model.configured) {
		return <p className="text-[11px] text-amber-300">{S.kittModelOffline}</p>;
	}
	return (
		<p className="flex items-center gap-1.5 text-[11px] text-emerald-300">
			<span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
			{S.kittModelOnline(model.provider, model.model ?? '')}
		</p>
	);
}

export function KittPanel({ collections }: { collections: CollectionsState }) {
	const { S } = useI18n();
	const kitt = useKitt(collections);
	const [open, setOpen] = useState(false);
	const fileInput = useRef<HTMLInputElement>(null);
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = scrollRef.current;
		if (container) container.scrollTop = container.scrollHeight;
	}, [kitt.messages, kitt.busy, kitt.listening, open]);

	const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			void kitt.send(kitt.input);
		}
	};

	const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) void kitt.handleFile(file);
		event.target.value = '';
	};

	const toggleOpen = () => {
		if (open) kitt.toggleListen();
		setOpen((value) => !value);
	};

	return (
		<div className="fixed bottom-20 right-4 z-50 flex flex-col items-end md:bottom-6 md:right-6">
			{open && (
				<div className="mb-4 flex h-[min(68vh,560px)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl animate-fade-in-up dark:bg-slate-900">
					<div className="flex items-center justify-between bg-indigo-900 px-4 py-3 text-white">
						<div className="min-w-0">
							<span className="flex items-center font-bold">
								<Bot size={18} className="mr-2" />
								{S.kittTitle}
							</span>
							<ModelStatus model={kitt.model} />
						</div>
						<div className="flex items-center gap-1">
							<button
								type="button"
								onClick={kitt.toggleMute}
								aria-label={kitt.muted ? S.kittUnmute : S.kittMute}
								title={kitt.muted ? S.kittUnmute : S.kittMute}
								className="rounded p-1 transition hover:bg-indigo-800"
							>
								{kitt.muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
							</button>
							<button
								type="button"
								onClick={toggleOpen}
								aria-label={S.closeKitt}
								className="rounded p-1 transition hover:bg-indigo-800"
							>
								<X size={18} />
							</button>
						</div>
					</div>

					{kitt.files.length > 0 && (
						<div className="flex items-center gap-1.5 overflow-x-auto border-b border-gray-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-950/60">
							{kitt.files.map((file) => (
								<span
									key={file.id}
									className="flex shrink-0 items-center gap-1 rounded-full bg-indigo-100 px-2.5 py-1 text-[11px] font-medium text-indigo-800 dark:bg-indigo-500/15 dark:text-indigo-300"
								>
									<FileSpreadsheet size={12} />
									{file.name} · {file.rowCount}
									<button
										type="button"
										onClick={() => void kitt.handleRemoveFile(file.id)}
										aria-label={S.removeFile(file.name)}
										className="ml-0.5 text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-100"
									>
										<X size={12} />
									</button>
								</span>
							))}
						</div>
					)}

					<div
						ref={scrollRef}
						className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-4 dark:bg-slate-950/50"
					>
						{kitt.messages.length === 0 && (
							<div className="w-4/5 rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-gray-200">
								{S.kittWelcome}
							</div>
						)}
						{kitt.messages.map((message, index) => (
							<div
								key={index}
								className={`w-4/5 whitespace-pre-wrap rounded-xl p-3 text-sm ${
									message.role === 'user'
										? 'ml-auto bg-indigo-600 text-white'
										: 'border border-gray-200 bg-white text-gray-800 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100'
								}`}
							>
								{message.text}
							</div>
						))}
						{kitt.listening && (
							<div className="flex w-4/5 items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 p-3 text-sm text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-950/40 dark:text-indigo-300">
								<span className="h-2 w-2 animate-pulse rounded-full bg-indigo-500" />
								{S.kittListening}
							</div>
						)}
						{kitt.busy && !kitt.listening && (
							<div className="flex w-4/5 items-center gap-2 rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-400 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500">
								<Loader2 size={16} className="animate-spin" />
								{S.kittThinking}
							</div>
						)}
					</div>

					<form
						onSubmit={(event) => {
							event.preventDefault();
							void kitt.send(kitt.input);
						}}
						className="flex items-end gap-2 border-t border-gray-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
					>
						<input
							ref={fileInput}
							type="file"
							accept=".xlsx,.xls,.csv"
							className="hidden"
							onChange={onFileChange}
						/>
						<button
							type="button"
							onClick={() => fileInput.current?.click()}
							aria-label={S.kittAttach}
							title={S.kittAttach}
							className="rounded-lg p-2.5 text-gray-500 transition hover:bg-gray-100 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-indigo-300"
						>
							<Paperclip size={16} />
						</button>
						<textarea
							value={kitt.input}
							onChange={(event) => kitt.setInput(event.target.value)}
							onKeyDown={onKeyDown}
							placeholder={S.kittPlaceholder}
							rows={1}
							className="max-h-24 flex-1 resize-none rounded-lg border border-gray-300 bg-white p-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100 dark:focus:ring-indigo-900/40"
						/>
						<button
							type="button"
							onClick={kitt.toggleListen}
							disabled={!kitt.input && !kitt.listening}
							aria-label={kitt.listening ? S.kittListening : S.kittPlaceholder}
							className={`rounded-lg p-2.5 transition disabled:opacity-40 ${
								kitt.listening
									? 'animate-pulse bg-rose-500 text-white'
									: 'bg-gray-900 text-white hover:bg-gray-800 dark:bg-slate-700 dark:hover:bg-slate-600'
							}`}
						>
							{kitt.listening ? <MicOff size={16} /> : <Mic size={16} />}
						</button>
						<button
							type="submit"
							disabled={kitt.busy || !kitt.input.trim()}
							aria-label={S.send}
							className="rounded-lg bg-indigo-600 p-2.5 text-white transition hover:bg-indigo-700 disabled:opacity-50"
						>
							<Send size={16} />
						</button>
					</form>
				</div>
			)}

			<button
				type="button"
				onClick={toggleOpen}
				aria-label={S.kittTitle}
				className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-xl transition hover:bg-indigo-700"
			>
				<MessageSquare size={24} />
			</button>
		</div>
	);
}
