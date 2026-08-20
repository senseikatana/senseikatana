import { useEffect, useState } from 'react';
import {
	ArrowDownToLine,
	Box,
	LayoutDashboard,
	ListChecks,
	MessageCircle,
	Route,
	Send,
	ShieldCheck,
	UserCog,
	Users,
} from 'lucide-react';
import { can as canByRole, roleLabel, type Capability } from '../../auth/roles';
import { getStore } from '../../data/store';
import { schemas } from '../../data/schemas';
import { useAuth, type AuthMode, type RegisterInput } from '../../hooks/useAuth';
import { useCollections } from '../../hooks/useCollections';
import { useRoles } from '../../hooks/useRoles';
import { useI18n, LocaleProvider } from '../../i18n/LocaleProvider';
import { generateMock } from '../../lib/mock';
import { ThemeProvider } from '../../lib/theme';
import type { CollectionKey, Operator, Session, ViewKey } from '../../types';
import { AdvancedPickingView } from './AdvancedPickingView';
import { CrudView } from './CrudView';
import { DashboardView } from './DashboardView';
import { Header } from './Header';
import { KittPanel } from './KittPanel';
import { LoginScreen } from './LoginScreen';
import { MessagingView } from './MessagingView';
import { MobileNav } from './MobileNav';
import { RolesView } from './RolesView';
import { Sidebar, type NavItem } from './Sidebar';
import { ToastProvider } from './Toast';

const MOCK_LIMIT = 500;

function BootScreen() {
	const { S } = useI18n();
	return (
		<div className="flex min-h-screen items-center justify-center bg-slate-950">
			<div className="flex flex-col items-center gap-3 text-white">
				<div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-indigo-500" />
				<p className="text-sm text-slate-400">{S.bootMessage}</p>
			</div>
		</div>
	);
}

interface DashboardShellProps {
	session: Session | null;
	authMode: AuthMode;
	signIn: (operator: Operator) => void;
	signInWithPassword: (email: string, password: string) => Promise<string | null>;
	register: (input: RegisterInput) => Promise<{ error: string | null; needsConfirmation: boolean }>;
	signOut: () => void;
}

function DashboardShell({
	session,
	authMode,
	signIn,
	signInWithPassword,
	register,
	signOut,
}: DashboardShellProps) {
	const { S } = useI18n();
	const store = getStore();
	const collections = useCollections(true);
	const { roles } = useRoles();
	const [view, setView] = useState<ViewKey>('dashboard');
	const [mobileOpen, setMobileOpen] = useState(false);
	const [sidebarCollapsed, setSidebarCollapsed] = useState(
		() => localStorage.getItem('whm.sidebar.collapsed') === '1',
	);

	const can = (cap: Capability) => (session ? canByRole(session.roleId, cap, roles) : false);

	const navItems: NavItem[] = [
		{ key: 'dashboard', label: S.dashboard, icon: LayoutDashboard },
		{ key: 'inventory', label: S.inventory, icon: Box },
		{ key: 'picking', label: S.picking, icon: ListChecks },
		{ key: 'inOrders', label: S.inOrders, icon: ArrowDownToLine },
		{ key: 'outOrders', label: S.outOrders, icon: Send },
		{ key: 'routes', label: S.routes, icon: Route },
		{ key: 'messaging', label: S.messaging, icon: MessageCircle },
		{ key: 'crm', label: S.crm, icon: Users },
		{ key: 'users', label: S.users, icon: UserCog },
		{ key: 'roles', label: S.rolesTitle, icon: ShieldCheck },
	];

	const visibleItems = navItems.filter((item) => {
		if (item.key === 'roles') return can('manage:roles');
		const cap =
			item.key === 'dashboard'
				? 'view:dashboard'
				: item.key === 'picking'
					? 'view:picking'
					: item.key === 'messaging'
						? 'view:messaging'
						: (`view:${item.key}` as Capability);
		return can(cap);
	});

	const DOCK_KEYS: ViewKey[] = ['dashboard', 'inventory', 'picking', 'messaging'];
	const dockItems = visibleItems.filter((item) => DOCK_KEYS.includes(item.key));

	const viewTitles: Record<ViewKey, string> = {
		dashboard: S.dashboard,
		inventory: S.inventory,
		picking: S.picking,
		inOrders: S.inOrders,
		outOrders: S.outOrders,
		routes: S.routes,
		messaging: S.messaging,
		crm: S.crm,
		users: S.users,
		roles: S.rolesTitle,
	};

	useEffect(() => {
		if (!session) return;
		const cap: Capability =
			view === 'roles'
				? 'manage:roles'
				: view === 'dashboard'
					? 'view:dashboard'
					: view === 'picking'
						? 'view:picking'
						: view === 'messaging'
							? 'view:messaging'
							: (`view:${view}` as Capability);
		if (!canByRole(session.roleId, cap, roles)) setView('dashboard');
	}, [view, session, roles]);

	if (!session) {
		return (
			<LoginScreen
				operators={collections.users.docs}
				roles={roles}
				loading={collections.users.loading}
				authMode={authMode}
				onSelect={signIn}
				onSignInWithPassword={signInWithPassword}
				onRegister={register}
			/>
		);
	}

	const isCrud =
		view !== 'dashboard' && view !== 'picking' && view !== 'messaging' && view !== 'roles';
	const crudKey = (isCrud ? view : null) as CollectionKey | null;

	const canInjectMock =
		crudKey !== null &&
		collections[crudKey].docs.length < MOCK_LIMIT &&
		can('dev:mock');

	const navigate = (next: ViewKey) => {
		setView(next);
		setMobileOpen(false);
	};

	const toggleSidebar = () => {
		setSidebarCollapsed((value) => {
			localStorage.setItem('whm.sidebar.collapsed', value ? '0' : '1');
			return !value;
		});
	};

	const injectMock = async (entity: CollectionKey, count: number) => {
		await store.createMany(entity, generateMock(entity, count));
	};

	return (
		<div className="flex h-screen overflow-hidden bg-slate-100 font-sans text-gray-900 dark:bg-slate-950 dark:text-gray-100">
			<Sidebar
				items={visibleItems}
				active={view}
				onNavigate={navigate}
				open={mobileOpen}
				onClose={() => setMobileOpen(false)}
				collapsed={sidebarCollapsed}
			/>

			<main className="flex h-full flex-1 flex-col overflow-hidden">
				<Header
					session={session}
					roleLabel={roleLabel(session.roleId, roles)}
					onToggleSidebar={toggleSidebar}
					sidebarCollapsed={sidebarCollapsed}
					onSignOut={signOut}
				/>

				<div className="flex-1 overflow-y-auto p-4 pb-24 md:p-8 md:pb-8">
					{view === 'dashboard' && <DashboardView collections={collections} canAi={can('ai')} />}
					{view === 'picking' && (
						<AdvancedPickingView
							outOrders={collections.outOrders.docs}
							inventory={collections.inventory.docs}
						/>
					)}
					{view === 'messaging' && <MessagingView />}
					{view === 'roles' && <RolesView roles={roles} users={collections.users.docs} />}
					{crudKey && (
						<CrudView
							entity={crudKey}
							title={viewTitles[crudKey]}
							store={store}
							collection={collections[crudKey]}
							allCollections={collections}
							fields={schemas[crudKey]}
							canInjectMock={canInjectMock}
							onInjectMock={injectMock}
							canEdit={can(`edit:${crudKey}` as Capability)}
							canDelete={can(`edit:${crudKey}` as Capability)}
						/>
					)}
				</div>

				{can('kitt') && <KittPanel collections={collections} />}
			</main>

			<MobileNav
				items={dockItems}
				active={view}
				onNavigate={navigate}
				onMore={() => setMobileOpen(true)}
			/>
		</div>
	);
}

export default function App() {
	const { status, authMode, session, signIn, signInWithPassword, register, signOut } = useAuth();

	return (
		<LocaleProvider>
			<ThemeProvider>
				<ToastProvider>
					{status === 'loading' ? (
						<BootScreen />
					) : (
						<DashboardShell
							session={session}
							authMode={authMode}
							signIn={signIn}
							signInWithPassword={signInWithPassword}
							register={register}
							signOut={signOut}
						/>
					)}
				</ToastProvider>
			</ThemeProvider>
		</LocaleProvider>
	);
}
