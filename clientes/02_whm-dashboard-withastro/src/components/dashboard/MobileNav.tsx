import { Menu } from 'lucide-react';
import { useI18n } from '../../i18n/LocaleProvider';
import type { ViewKey } from '../../types';
import type { NavItem } from './Sidebar';

interface MobileNavProps {
	items: NavItem[];
	active: ViewKey;
	onNavigate: (view: ViewKey) => void;
	onMore: () => void;
}

export function MobileNav({ items, active, onNavigate, onMore }: MobileNavProps) {
	const { S } = useI18n();
	return (
		<div className="dock dock-sm border-t border-gray-200 bg-white pb-[env(safe-area-inset-bottom)] text-gray-500 shadow-[0_-4px_16px_rgba(15,23,42,0.08)] md:hidden dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
			{items.map(({ key, label, icon: Icon }) => {
				const isActive = active === key;
				return (
					<button
						key={key}
						type="button"
						onClick={() => onNavigate(key)}
						aria-current={isActive ? 'page' : undefined}
						className={isActive ? 'dock-active text-indigo-600 dark:text-indigo-400' : ''}
					>
						<Icon size={20} />
						<span className="dock-label">{label}</span>
					</button>
				);
			})}
			<button type="button" onClick={onMore} aria-label={S.more}>
				<Menu size={20} />
				<span className="dock-label">{S.more}</span>
			</button>
		</div>
	);
}
