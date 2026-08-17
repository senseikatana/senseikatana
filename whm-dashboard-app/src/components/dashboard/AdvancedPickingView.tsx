import { useMemo, useRef, useState } from 'react';
import { ListChecks, Mic, MicOff, Volume2 } from 'lucide-react';
import { useI18n } from '../../i18n/LocaleProvider';
import { LOCALE_TO_LANG } from '../../lib/voice';
import { buildPickingTasks } from '../../lib/picking';
import type { Doc } from '../../types';
import { useToast } from './Toast';

interface AdvancedPickingViewProps {
	outOrders: Doc[];
	inventory: Doc[];
}

export function AdvancedPickingView({ outOrders, inventory }: AdvancedPickingViewProps) {
	const { S, locale } = useI18n();
	const toast = useToast();
	const [speaking, setSpeaking] = useState(false);
	const speech = useRef<SpeechSynthesis | null>(null);

	const tasks = useMemo(() => buildPickingTasks(outOrders, inventory), [outOrders, inventory]);
	const lang = LOCALE_TO_LANG[locale] ?? 'es-ES';

	const speakSequence = (index: number) => {
		if (!speech.current) return;
		if (index >= tasks.length) {
			const done = new SpeechSynthesisUtterance(S.pickingDone);
			done.lang = lang;
			done.onend = () => setSpeaking(false);
			speech.current.speak(done);
			return;
		}
		const task = tasks[index];
		const utterance = new SpeechSynthesisUtterance(
			S.pickingInstruction(task.zone, task.qty, task.product),
		);
		utterance.lang = lang;
		utterance.onend = () => speakSequence(index + 1);
		speech.current.speak(utterance);
	};

	const toggleVoice = () => {
		if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
			toast(S.voiceUnsupported, 'info');
			return;
		}
		if (speaking) {
			window.speechSynthesis.cancel();
			setSpeaking(false);
			return;
		}
		if (tasks.length === 0) {
			toast(S.noTasks, 'info');
			return;
		}
		speech.current = window.speechSynthesis;
		setSpeaking(true);
		speakSequence(0);
	};

	return (
		<div className="flex h-full animate-fade-in flex-col gap-4">
			<div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900">
				<div>
					<h2 className="flex items-center text-xl font-bold text-gray-900 dark:text-white">
						<ListChecks className="mr-2 text-indigo-600" />
						{S.pickingTitle}
					</h2>
					<p className="mt-1 text-sm text-gray-500 dark:text-slate-400">{S.pickingSubtitle}</p>
				</div>
				<button
					type="button"
					onClick={toggleVoice}
					className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition ${
						speaking
							? 'animate-pulse bg-rose-500 text-white'
							: 'bg-gray-900 text-white hover:bg-gray-800 dark:bg-slate-700 dark:hover:bg-slate-600'
					}`}
				>
					{speaking ? <MicOff size={18} /> : <Mic size={18} />}
					{speaking ? S.voiceStop : S.voiceStart}
				</button>
			</div>

			{tasks.length === 0 && (
				<div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-gray-300 bg-white p-10 text-gray-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
					<Volume2 size={32} className="text-gray-300 dark:text-slate-700" />
					<p className="text-sm">{S.noTasks}</p>
				</div>
			)}

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
				{tasks.map((task) => (
					<div
						key={task.id}
						className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
					>
						<div className="mb-3 flex items-start justify-between">
							<span
								className={`rounded px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${
									task.type === 'Cross-Docking'
										? 'bg-purple-100 text-purple-800 dark:bg-purple-500/15 dark:text-purple-300'
										: 'bg-gray-100 text-gray-800 dark:bg-slate-700 dark:text-slate-300'
								}`}
							>
								{task.type}
							</span>
							<span className="font-mono text-xs text-gray-400 dark:text-slate-500">{task.id}</span>
						</div>
						<h3 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">{task.product}</h3>
						<div className="mb-4 text-3xl font-black text-indigo-600">
							{task.qty}{' '}
							<span className="text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-slate-400">
								{S.units}
							</span>
						</div>
						<div className="rounded-lg border border-gray-100 bg-gray-50 p-3 text-sm dark:border-slate-800 dark:bg-slate-800/50">
							<div className="flex justify-between">
								<span className="text-gray-500 dark:text-slate-400">{S.zone}</span>
								<span className="font-bold text-gray-900 dark:text-white">{task.zone}</span>
							</div>
							{task.destination && (
								<div className="mt-1 flex justify-between">
									<span className="text-gray-500 dark:text-slate-400">{S.destination}</span>
									<span className="font-bold text-gray-900 dark:text-white">{task.destination}</span>
								</div>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
