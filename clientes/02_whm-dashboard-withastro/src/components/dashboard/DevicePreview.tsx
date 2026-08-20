import { useEffect, useState } from 'react';
import { Monitor, Smartphone, Tablet, X } from 'lucide-react';
import type { Locale } from '../../i18n/dictionaries';

type Device = 'mobile' | 'tablet' | 'desktop';

interface DeviceSpec {
	id: Device;
	width: number | 'full';
	height: number | 'full';
}

const DEVICES: DeviceSpec[] = [
	{ id: 'mobile', width: 390, height: 844 },
	{ id: 'tablet', width: 768, height: 1024 },
	{ id: 'desktop', width: 'full', height: 'full' },
];

const LABELS: Record<
	Locale,
	{ button: string; close: string; mobile: string; tablet: string; desktop: string }
> = {
	es: {
		button: 'Vista previa responsive',
		close: 'Cerrar vista previa',
		mobile: 'Móvil',
		tablet: 'Tablet',
		desktop: 'Desktop',
	},
	en: {
		button: 'Responsive preview',
		close: 'Close preview',
		mobile: 'Mobile',
		tablet: 'Tablet',
		desktop: 'Desktop',
	},
	ca: {
		button: 'Vista prèvia responsive',
		close: 'Tanca la vista prèvia',
		mobile: 'Mòbil',
		tablet: 'Tablet',
		desktop: 'Desktop',
	},
	fr: {
		button: 'Aperçu responsive',
		close: 'Fermer l’aperçu',
		mobile: 'Mobile',
		tablet: 'Tablet',
		desktop: 'Desktop',
	},
};

function readLocale(): Locale {
	if (typeof window === 'undefined') return 'es';
	const saved = localStorage.getItem('whm.locale') as Locale | null;
	return saved === 'en' || saved === 'ca' || saved === 'fr' ? saved : 'es';
}

function formatDims(width: number | 'full', height: number | 'full'): string {
	return width === 'full' ? '100%' : `${width}×${height}`;
}

function DeviceIcon({ id, size = 18 }: { id: Device; size?: number }) {
	if (id === 'mobile') return <Smartphone size={size} />;
	if (id === 'tablet') return <Tablet size={size} />;
	return <Monitor size={size} />;
}

export function DevicePreview() {
	const [locale, setLocale] = useState<Locale>('es');
	const [menuOpen, setMenuOpen] = useState(false);
	const [device, setDevice] = useState<Device | null>(null);
	const [src, setSrc] = useState('');

	useEffect(() => {
		setLocale(readLocale());
	}, []);

	useEffect(() => {
		if (!device) return;
		document.body.style.overflow = 'hidden';
		const onKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setDevice(null);
		};
		window.addEventListener('keydown', onKey);
		return () => {
			document.body.style.overflow = '';
			window.removeEventListener('keydown', onKey);
		};
	}, [device]);

	const open = (id: Device) => {
		if (!device) setSrc(window.location.pathname + window.location.search);
		setDevice(id);
		setMenuOpen(false);
	};

	const L = LABELS[locale];
	const active = DEVICES.find((item) => item.id === device) ?? null;

	return (
		<>
			<div className="fixed bottom-28 right-4 z-50 hidden lg:block md:right-6">
				<div className="flex flex-col items-end gap-2">
					{menuOpen && (
						<div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl animate-fade-in-up dark:border-slate-800 dark:bg-slate-900">
							{DEVICES.map((item) => (
								<button
									key={item.id}
									type="button"
									onClick={() => open(item.id)}
									className="flex w-44 items-center gap-3 px-4 py-3 text-sm text-gray-700 transition hover:bg-indigo-50 hover:text-indigo-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-indigo-300"
								>
									<DeviceIcon id={item.id} />
									<span className="flex-1 text-left">{L[item.id]}</span>
									<span className="text-xs tabular-nums text-gray-400 dark:text-slate-500">
										{formatDims(item.width, item.height)}
									</span>
								</button>
							))}
						</div>
					)}
					<button
						type="button"
						onClick={() => setMenuOpen((value) => !value)}
						aria-label={L.button}
						title={L.button}
						aria-expanded={menuOpen}
						className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white shadow-xl transition hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
					>
						<Monitor size={24} />
					</button>
				</div>
			</div>

			{device && active && (
				<div className="fixed inset-0 z-[70] flex flex-col bg-slate-950">
					<div className="flex h-12 shrink-0 items-center justify-between px-4 text-slate-200">
						<span className="text-sm font-medium">
							{L[device]} · {formatDims(active.width, active.height)}
						</span>
						<div className="flex items-center gap-1 rounded-full bg-white/10 p-1">
							{DEVICES.map((item) => (
								<button
									key={item.id}
									type="button"
									onClick={() => open(item.id)}
									aria-label={L[item.id]}
									title={L[item.id]}
									className={`flex h-8 w-8 items-center justify-center rounded-full transition ${
										item.id === device
											? 'bg-indigo-600 text-white'
											: 'text-slate-300 hover:bg-white/10'
									}`}
								>
									<DeviceIcon id={item.id} size={16} />
								</button>
							))}
						</div>
						<button
							type="button"
							onClick={() => setDevice(null)}
							aria-label={L.close}
							title={L.close}
							className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
						>
							<X size={18} />
						</button>
					</div>
					<div className="flex flex-1 items-center justify-center overflow-auto p-4">
						<div
							className={`overflow-hidden bg-slate-800 shadow-2xl ${
								device === 'mobile'
									? 'rounded-[2rem] border-[10px] border-slate-700'
									: device === 'tablet'
										? 'rounded-3xl border-8 border-slate-700'
										: 'h-full w-full rounded-none border-0'
							}`}
						>
							<iframe
								src={src}
								title={L[device]}
								width={active.width === 'full' ? '100%' : active.width}
								height={active.height === 'full' ? '100%' : active.height}
								className="block bg-white"
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
