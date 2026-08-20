import { LogOut, Moon, PanelLeftClose, PanelLeftOpen, Radio, Sun } from 'lucide-react';
import { useI18n } from '../../i18n/LocaleProvider';
import { useTheme } from '../../lib/theme';
import type { Session } from '../../types';
import { LanguageSelect } from './LanguageSelect';

interface HeaderProps {
	session: Session;
	roleLabel: string;
	onToggleSidebar: () => void;
	sidebarCollapsed: boolean;
	onSignOut: () => void;
}

export function Header({ session, roleLabel, onToggleSidebar, sidebarCollapsed, onSignOut }: HeaderProps) {
	const { theme, toggleTheme } = useTheme();
	const { S } = useI18n();

	return (
		<header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 md:px-6 dark:border-slate-800 dark:bg-slate-900">
			<div className="flex items-center gap-3">
				<button
					type="button"
					onClick={onToggleSidebar}
					aria-label={sidebarCollapsed ? S.sidebarExpand : S.sidebarCollapse}
					title={sidebarCollapsed ? S.sidebarExpand : S.sidebarCollapse}
					className="hidden rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white md:inline-flex"
				>
					{sidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
				</button>
				<span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
					<Radio size={12} />
					{S.modeLocal}
				</span>
			</div>

			<div className="flex items-center gap-3">
				<LanguageSelect />
				<button
					type="button"
					onClick={toggleTheme}
					aria-label={theme === 'dark' ? S.themeLight : S.themeDark}
					title={theme === 'dark' ? S.themeLight : S.themeDark}
					className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
				>
					{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
				</button>
				<div className="hidden text-right leading-tight sm:block">
					<p className="text-sm font-bold text-gray-900 dark:text-white">{session.name}</p>
					<p className="text-xs text-gray-500 dark:text-slate-400">{roleLabel}</p>
				</div>
				<button
					type="button"
					onClick={onSignOut}
					aria-label={S.signOut}
					title={S.signOut}
					className="rounded-lg p-2 text-gray-500 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 dark:hover:text-rose-400"
				>
					<LogOut size={18} />
				</button>
			</div>
		</header>
	);
}
