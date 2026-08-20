import type { LucideIcon } from 'lucide-react';

interface KpiCardProps {
	title: string;
	value: string | number;
	subtitle?: string;
	icon: LucideIcon;
	tone?: 'default' | 'danger' | 'success';
}

const TONE_STYLES = {
	default: {
		card: 'bg-white border-gray-200 dark:bg-slate-900 dark:border-slate-800',
		icon: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400',
		value: 'text-gray-900 dark:text-white',
	},
	danger: {
		card: 'bg-rose-50 border-rose-100 dark:bg-rose-950/40 dark:border-rose-900/50',
		icon: 'bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-400',
		value: 'text-rose-900 dark:text-rose-300',
	},
	success: {
		card: 'bg-emerald-50 border-emerald-100 dark:bg-emerald-950/40 dark:border-emerald-900/50',
		icon: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400',
		value: 'text-emerald-900 dark:text-emerald-300',
	},
} as const;

export function KpiCard({ title, value, subtitle, icon: Icon, tone = 'default' }: KpiCardProps) {
	const styles = TONE_STYLES[tone];
	return (
		<div className={`rounded-xl border p-5 transition-all hover:shadow-md ${styles.card}`}>
			<div className={`mb-4 inline-flex rounded-lg p-2.5 ${styles.icon}`}>
				<Icon size={20} />
			</div>
			<h3 className="mb-1 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
				{title}
			</h3>
			<div className={`text-3xl font-extrabold tracking-tight ${styles.value}`}>{value}</div>
			{subtitle && (
				<p className="mt-1 text-sm font-medium text-gray-500 dark:text-slate-400">{subtitle}</p>
			)}
		</div>
	);
}
