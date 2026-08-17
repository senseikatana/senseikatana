import { getStatusTone } from '../../lib/status';
import type { StatusTone } from '../../types';

const TONE_CLASSES: Record<StatusTone, string> = {
	green: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30',
	orange: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30',
	red: 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-500/15 dark:text-rose-300 dark:border-rose-500/30',
	gray: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-slate-700/60 dark:text-slate-300 dark:border-slate-600',
};

export function StatusBadge({ status }: { status: string }) {
	return (
		<span
			className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${TONE_CLASSES[getStatusTone(status)]}`}
		>
			{status}
		</span>
	);
}
