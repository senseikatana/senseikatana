import { X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useI18n } from '../../i18n/LocaleProvider';
import type { ViewKey } from '../../types';

export interface NavItem {
	key: ViewKey;
	label: string;
	icon: LucideIcon;
}

interface SidebarProps {
	items: NavItem[];
	active: ViewKey;
	onNavigate: (view: ViewKey) => void;
	open: boolean;
	onClose: () => void;
	collapsed: boolean;
}

export function Sidebar({ items, active, onNavigate, open, onClose, collapsed }: SidebarProps) {
	const { S } = useI18n();
	return (
		<>
			{open && (
				<div
					className="fixed inset-0 z-40 bg-gray-900/60 md:hidden"
					onClick={onClose}
					aria-hidden="true"
				/>
			)}
			<aside
				className={`fixed inset-y-0 left-0 z-50 flex h-full flex-col bg-[#0F172A] transition-all md:static md:translate-x-0 ${
					collapsed ? 'md:w-[72px]' : 'md:w-72'
				} w-72 ${open ? 'translate-x-0' : '-translate-x-full'}`}
			>
				<div className={`flex items-center justify-between p-6 ${collapsed ? 'md:justify-center md:px-0' : ''}`}>
					<div className={collapsed ? 'md:hidden' : ''}>
						<h1 className="text-lg font-extrabold text-white">{S.appName}</h1>
						<p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
							{S.tagline}
						</p>
					</div>
					{collapsed && (
						<span className="hidden text-lg font-extrabold text-white md:inline" title={S.appName}>
							W
						</span>
					)}
					<button
						type="button"
						onClick={onClose}
						aria-label={S.closeMenu}
						className="rounded-lg p-1 text-gray-400 hover:text-white md:hidden"
					>
						<X size={24} />
					</button>
				</div>

				<nav className="flex-1 overflow-y-auto px-4 pb-6 md:px-2">
					{items.map(({ key, label, icon: Icon }) => {
						const isActive = active === key;
						return (
							<button
								key={key}
								type="button"
								onClick={() => onNavigate(key)}
								aria-current={isActive ? 'page' : undefined}
								title={collapsed ? label : undefined}
								className={`mb-1 flex w-full items-center rounded-lg text-left transition-all ${
									collapsed ? 'justify-center px-0 py-2.5' : 'px-4 py-2.5'
								} ${
									isActive
										? 'bg-indigo-600 text-white shadow-md'
										: 'text-gray-400 hover:bg-gray-800 hover:text-white'
								}`}
							>
								<Icon
									size={18}
									className={isActive ? 'shrink-0 text-white' : 'shrink-0 text-gray-400'}
								/>
								{!collapsed && (
									<span className={`ml-3 text-sm font-medium ${collapsed ? 'hidden' : ''}`}>
										{label}
									</span>
								)}
							</button>
						);
					})}
				</nav>
			</aside>
		</>
	);
}
