import type { CollectionsState } from '../hooks/useCollections';
import type { Doc } from '../types';

const DOC_LIMIT = 500;

function strip(doc: Doc): Record<string, unknown> {
	const { id: _id, createdAt: _createdAt, ...rest } = doc;
	return rest;
}

function counts(docs: Doc[], key: string): Record<string, number> {
	return docs.reduce<Record<string, number>>((acc, doc) => {
		const value = String(doc[key] ?? 'Sin dato');
		acc[value] = (acc[value] ?? 0) + 1;
		return acc;
	}, {});
}

function pendingRefs(docs: Doc[], key: string): string[] {
	return docs
		.filter((doc) => doc.status === 'Pendiente')
		.map((doc) => String(doc[key] ?? ''))
		.filter(Boolean);
}

export interface WarehouseSnapshot {
	inventory: {
		count: number;
		byStatus: Record<string, number>;
		byClass: Record<string, number>;
		totalStock: number;
		critical: string[];
		docs: Record<string, unknown>[];
	};
	inOrders: {
		count: number;
		byStatus: Record<string, number>;
		pending: string[];
		docs: Record<string, unknown>[];
	};
	outOrders: {
		count: number;
		byStatus: Record<string, number>;
		pending: string[];
		docs: Record<string, unknown>[];
	};
	routes: { count: number; byStatus: Record<string, number>; docs: Record<string, unknown>[] };
	crm: { count: number; byStatus: Record<string, number>; docs: Record<string, unknown>[] };
	users: { count: number; byRole: Record<string, number>; docs: Record<string, unknown>[] };
}

export function buildWarehouseSnapshot(collections: CollectionsState): WarehouseSnapshot {
	const inventory = collections.inventory.docs;
	const critical = inventory
		.filter((doc) => String(doc.status) === 'Crítico')
		.map((doc) => `${String(doc.name ?? '')} (${String(doc.sku ?? '')}) stock ${doc.stock ?? 0}`)
		.slice(0, 50);

	return {
		inventory: {
			count: inventory.length,
			byStatus: counts(inventory, 'status'),
			byClass: counts(inventory, 'abcClass'),
			totalStock: inventory.reduce((sum, doc) => sum + (Number(doc.stock) || 0), 0),
			critical,
			docs: inventory.slice(0, DOC_LIMIT).map(strip),
		},
		inOrders: {
			count: collections.inOrders.docs.length,
			byStatus: counts(collections.inOrders.docs, 'status'),
			pending: pendingRefs(collections.inOrders.docs, 'orderRef'),
			docs: collections.inOrders.docs.slice(0, DOC_LIMIT).map(strip),
		},
		outOrders: {
			count: collections.outOrders.docs.length,
			byStatus: counts(collections.outOrders.docs, 'status'),
			pending: pendingRefs(collections.outOrders.docs, 'orderRef'),
			docs: collections.outOrders.docs.slice(0, DOC_LIMIT).map(strip),
		},
		routes: {
			count: collections.routes.docs.length,
			byStatus: counts(collections.routes.docs, 'status'),
			docs: collections.routes.docs.slice(0, DOC_LIMIT).map(strip),
		},
		crm: {
			count: collections.crm.docs.length,
			byStatus: counts(collections.crm.docs, 'status'),
			docs: collections.crm.docs.slice(0, DOC_LIMIT).map(strip),
		},
		users: {
			count: collections.users.docs.length,
			byRole: counts(collections.users.docs, 'role'),
			docs: collections.users.docs.slice(0, DOC_LIMIT).map(strip),
		},
	};
}
