import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { LOCALE_ORDER, type Locale } from '../../i18n/dictionaries';
import { useI18n } from '../../i18n/LocaleProvider';

function Flag({ code, className }: { code: Locale; className?: string }) {
	switch (code) {
		case 'es':
			return (
				<svg viewBox="0 0 4 3" className={className} aria-hidden="true">
					<rect width="4" height="3" fill="#AA151B" />
					<rect y="0.75" width="4" height="1.5" fill="#F1BF00" />
				</svg>
			);
		case 'en':
			return (
				<svg viewBox="0 0 19 13" className={className} aria-hidden="true">
					<rect width="19" height="13" fill="#FFFFFF" />
					<g fill="#B22234">
						<rect y="0" width="19" height="1" />
						<rect y="2" width="19" height="1" />
						<rect y="4" width="19" height="1" />
						<rect y="6" width="19" height="1" />
						<rect y="8" width="19" height="1" />
						<rect y="10" width="19" height="1" />
						<rect y="12" width="19" height="1" />
					</g>
					<rect width="8" height="7" fill="#3C3B6E" />
					<g fill="#FFFFFF">
						<circle cx="1.1" cy="1" r="0.45" />
						<circle cx="3.3" cy="1" r="0.45" />
						<circle cx="5.5" cy="1" r="0.45" />
						<circle cx="7.7" cy="1" r="0.45" />
						<circle cx="2.2" cy="2.2" r="0.45" />
						<circle cx="4.4" cy="2.2" r="0.45" />
						<circle cx="6.6" cy="2.2" r="0.45" />
						<circle cx="1.1" cy="3.4" r="0.45" />
						<circle cx="3.3" cy="3.4" r="0.45" />
						<circle cx="5.5" cy="3.4" r="0.45" />
						<circle cx="7.7" cy="3.4" r="0.45" />
						<circle cx="2.2" cy="4.6" r="0.45" />
						<circle cx="4.4" cy="4.6" r="0.45" />
						<circle cx="6.6" cy="4.6" r="0.45" />
						<circle cx="1.1" cy="5.8" r="0.45" />
						<circle cx="3.3" cy="5.8" r="0.45" />
						<circle cx="5.5" cy="5.8" r="0.45" />
						<circle cx="7.7" cy="5.8" r="0.45" />
					</g>
				</svg>
			);
		case 'ca':
			return (
				<svg viewBox="0 0 4 3" className={className} aria-hidden="true">
					<rect width="4" height="3" fill="#FCDD09" />
					<g fill="#DA121A">
						<rect y="0.375" width="4" height="0.375" />
						<rect y="1.125" width="4" height="0.375" />
						<rect y="1.875" width="4" height="0.375" />
						<rect y="2.625" width="4" height="0.375" />
					</g>
				</svg>
			);
		case 'fr':
			return (
				<svg viewBox="0 0 3 2" className={className} aria-hidden="true">
					<rect width="1" height="2" fill="#0055A4" />
					<rect x="1" width="1" height="2" fill="#FFFFFF" />
					<rect x="2" width="1" height="2" fill="#EF4135" />
				</svg>
			);
	}
}

export function LanguageSelect() {
	const { locale, setLocale, localeLabel } = useI18n();
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!open) return;
		const onPointerDown = (event: PointerEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setOpen(false);
			}
		};
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setOpen(false);
		};
		document.addEventListener('pointerdown', onPointerDown);
		document.addEventListener('keydown', onKeyDown);
		return () => {
			document.removeEventListener('pointerdown', onPointerDown);
			document.removeEventListener('keydown', onKeyDown);
		};
	}, [open]);

	return (
		<div ref={ref} className="relative">
			<button
				type="button"
				onClick={() => setOpen((prev) => !prev)}
				aria-haspopup="listbox"
				aria-expanded={open}
				aria-label={localeLabel(locale)}
				className="flex items-center gap-2 rounded-lg border border-gray-200 px-2 py-1.5 text-xs font-bold text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
			>
				<Flag code={locale} className="h-3.5 w-5 rounded-[2px]" />
				<span className="hidden sm:inline">{localeLabel(locale)}</span>
				<ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
			</button>
			{open && (
				<ul
					role="listbox"
					className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-800"
				>
					{LOCALE_ORDER.map((code) => (
						<li key={code} role="option" aria-selected={locale === code}>
							<button
								type="button"
								onClick={() => {
									setLocale(code);
									setOpen(false);
								}}
								className={`flex w-full items-center gap-2 px-3 py-2 text-xs font-bold transition ${
									locale === code
										? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300'
										: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white'
								}`}
							>
								<Flag code={code} className="h-3.5 w-5 rounded-[2px]" />
								<span className="flex-1 text-left">{localeLabel(code)}</span>
								{locale === code && <Check size={14} />}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
