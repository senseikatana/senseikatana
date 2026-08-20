export type RoleId = 'admin' | 'manager' | 'picker' | 'formador' | 'practicas';

export type Capability =
	| 'view:dashboard'
	| 'ai'
	| 'kitt'
	| 'view:inventory'
	| 'edit:inventory'
	| 'view:picking'
	| 'edit:picking'
	| 'view:inOrders'
	| 'edit:inOrders'
	| 'view:outOrders'
	| 'edit:outOrders'
	| 'view:routes'
	| 'edit:routes'
	| 'view:messaging'
	| 'send:messaging'
	| 'view:crm'
	| 'edit:crm'
	| 'view:users'
	| 'manage:users'
	| 'manage:roles'
	| 'dev:mock';

export interface RoleDef {
	id: string;
	label: string;
	description?: string;
	capabilities: Capability[];
}

const ALL_CAPABILITIES: Capability[] = [
	'view:dashboard',
	'ai',
	'kitt',
	'view:inventory',
	'edit:inventory',
	'view:picking',
	'edit:picking',
	'view:inOrders',
	'edit:inOrders',
	'view:outOrders',
	'edit:outOrders',
	'view:routes',
	'edit:routes',
	'view:messaging',
	'send:messaging',
	'view:crm',
	'edit:crm',
	'view:users',
	'manage:users',
	'manage:roles',
	'dev:mock',
];

export const DEFAULT_ROLES: RoleDef[] = [
	{
		id: 'admin',
		label: 'Admin',
		description: 'Acceso total al sistema.',
		capabilities: [...ALL_CAPABILITIES],
	},
	{
		id: 'manager',
		label: 'Manager',
		description: 'Operación completa sin gestión de usuarios ni roles.',
		capabilities: ALL_CAPABILITIES.filter(
			(cap) => cap !== 'manage:users' && cap !== 'manage:roles' && cap !== 'dev:mock',
		),
	},
	{
		id: 'picker',
		label: 'Picker',
		description: 'Operativa de picking e inventario, con lectura de recepciones y expediciones.',
		capabilities: [
			'view:dashboard',
			'view:inventory',
			'edit:inventory',
			'view:picking',
			'edit:picking',
			'view:inOrders',
			'view:outOrders',
		],
	},
	{
		id: 'formador',
		label: 'Formador',
		description: 'Lectura en todo el sistema + demos de picking y mensajería (Curso de Novatecnica).',
		capabilities: [
			'view:dashboard',
			'ai',
			'kitt',
			'view:inventory',
			'view:picking',
			'edit:picking',
			'view:inOrders',
			'view:outOrders',
			'view:routes',
			'view:messaging',
			'send:messaging',
			'view:crm',
		],
	},
	{
		id: 'practicas',
		label: 'Prácticas',
		description: 'Jóvenes en prácticas del Curso de Novatecnica. Acceso supervisado, sin editar ni borrar.',
		capabilities: ['view:dashboard', 'view:inventory', 'view:picking', 'edit:picking'],
	},
];

export interface CapabilityGroup {
	moduleKey: string;
	viewCap: Capability;
	editCap: Capability | null;
	editLabelKey?: 'edit' | 'send' | 'manage';
}

export const CAPABILITY_GROUPS: CapabilityGroup[] = [
	{ moduleKey: 'dashboard', viewCap: 'view:dashboard', editCap: null },
	{ moduleKey: 'inventory', viewCap: 'view:inventory', editCap: 'edit:inventory' },
	{ moduleKey: 'picking', viewCap: 'view:picking', editCap: 'edit:picking' },
	{ moduleKey: 'inOrders', viewCap: 'view:inOrders', editCap: 'edit:inOrders' },
	{ moduleKey: 'outOrders', viewCap: 'view:outOrders', editCap: 'edit:outOrders' },
	{ moduleKey: 'routes', viewCap: 'view:routes', editCap: 'edit:routes' },
	{ moduleKey: 'messaging', viewCap: 'view:messaging', editCap: 'send:messaging', editLabelKey: 'send' },
	{ moduleKey: 'crm', viewCap: 'view:crm', editCap: 'edit:crm' },
	{ moduleKey: 'users', viewCap: 'view:users', editCap: 'manage:users', editLabelKey: 'manage' },
];

export interface SpecialCap {
	labelKey: string;
	cap: Capability;
}

export const SPECIAL_CAPS: SpecialCap[] = [
	{ labelKey: 'rolesTitle', cap: 'manage:roles' },
	{ labelKey: 'aiReportTitle', cap: 'ai' },
	{ labelKey: 'kittTitle', cap: 'kitt' },
	{ labelKey: 'generateMock', cap: 'dev:mock' },
];

export function capabilitiesOf(roleId: string | undefined, roles: readonly RoleDef[]): Capability[] {
	const role = roles.find((r) => r.id === roleId) ?? DEFAULT_ROLES.find((r) => r.id === roleId);
	return role?.capabilities ?? [];
}

export function can(roleId: string | undefined, cap: Capability, roles: readonly RoleDef[]): boolean {
	return capabilitiesOf(roleId, roles).includes(cap);
}

export function roleLabel(roleId: string | undefined, roles: readonly RoleDef[]): string {
	const role = roles.find((r) => r.id === roleId) ?? DEFAULT_ROLES.find((r) => r.id === roleId);
	return role?.label ?? roleId ?? '';
}

export function resolveRoleId(value: string | undefined | null): string {
	const v = value?.trim();
	if (!v) return 'picker';
	const found = DEFAULT_ROLES.find(
		(r) => r.id.toLowerCase() === v.toLowerCase() || r.label.toLowerCase() === v.toLowerCase(),
	);
	return found?.id ?? 'picker';
}
