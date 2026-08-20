export const COLLECTION_KEYS = [
	'inventory',
	'inOrders',
	'outOrders',
	'routes',
	'crm',
	'users',
] as const;

export type CollectionKey = (typeof COLLECTION_KEYS)[number];

export type ViewKey = CollectionKey | 'dashboard' | 'picking' | 'messaging' | 'roles';

export type Doc = { id: string } & Record<string, unknown>;

export type StatusTone = 'green' | 'orange' | 'red' | 'gray';

export interface Operator {
	uid: string;
	name: string;
	roleId: string;
}

export interface Session extends Operator {}

export type FieldType = 'text' | 'number' | 'select' | 'textarea';

export type GeneratorKey = 'sku' | 'orderRef' | 'routeId' | 'code';

export interface FieldDef {
	key: string;
	label: string;
	type: FieldType;
	options?: readonly string[];
	readonly?: boolean;
	auto?: boolean;
	gen?: GeneratorKey;
	colSpan?: boolean;
	required?: boolean;
	min?: number;
}
