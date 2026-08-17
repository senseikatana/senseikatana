import {
	createContext,
	useCallback,
	useContext,
	useState,
	type ReactNode,
} from 'react';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

type ToastTone = 'success' | 'error' | 'info';

interface ToastItem {
	id: number;
	message: string;
	tone: ToastTone;
}

type PushToast = (message: string, tone?: ToastTone) => void;

const ToastContext = createContext<PushToast>(() => {});

export const useToast = (): PushToast => useContext(ToastContext);

const TONE_STYLES: Record<ToastTone, string> = {
	success:
		'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-950/80 dark:text-emerald-200',
	error:
		'border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-500/30 dark:bg-rose-950/80 dark:text-rose-200',
	info: 'border-gray-200 bg-white text-gray-800 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100',
};

const TONE_ICONS: Record<ToastTone, typeof Info> = {
	success: CheckCircle2,
	error: AlertCircle,
	info: Info,
};

export function ToastProvider({ children }: { children: ReactNode }) {
	const [toasts, setToasts] = useState<ToastItem[]>([]);

	const push = useCallback<PushToast>((message, tone = 'info') => {
		const id = Date.now() + Math.random();
		setToasts((prev) => [...prev, { id, message, tone }]);
		window.setTimeout(() => {
			setToasts((prev) => prev.filter((toast) => toast.id !== id));
		}, 4000);
	}, []);

	return (
		<ToastContext.Provider value={push}>
			{children}
			<div className="pointer-events-none fixed bottom-6 left-1/2 z-[60] flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4">
				{toasts.map((toast) => {
					const Icon = TONE_ICONS[toast.tone];
					return (
						<div
							key={toast.id}
							className={`pointer-events-auto flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium shadow-lg animate-fade-in-down ${TONE_STYLES[toast.tone]}`}
							role="status"
						>
							<Icon size={18} className="shrink-0" />
							<span>{toast.message}</span>
						</div>
					);
				})}
			</div>
		</ToastContext.Provider>
	);
}
