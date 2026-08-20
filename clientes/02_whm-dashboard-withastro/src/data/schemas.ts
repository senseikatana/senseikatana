import type { CollectionKey, FieldDef } from '../types';

export const schemas: Record<CollectionKey, readonly FieldDef[]> = {
	inventory: [
		{ key: 'sku', label: 'SKU', type: 'text', auto: true, gen: 'sku' },
		{ key: 'name', label: 'Producto', type: 'text', colSpan: true, required: true },
		{ key: 'abcClass', label: 'Clase ABC', type: 'select', options: ['A', 'B', 'C'] },
		{ key: 'stock', label: 'Stock Actual', type: 'number', min: 0 },
		{ key: 'min', label: 'Mínimo', type: 'number', min: 0 },
		{ key: 'status', label: 'Estado', type: 'select', options: ['OK', 'Bajo', 'Crítico'], required: true },
	],
	inOrders: [
		{ key: 'orderRef', label: 'Ref', type: 'text', required: true, auto: true, gen: 'orderRef' },
		{ key: 'supplier', label: 'Proveedor', type: 'text', required: true },
		{ key: 'items', label: 'Uds', type: 'number', min: 0 },
		{ key: 'type', label: 'Operación', type: 'select', options: ['Estocaje', 'Cross-Docking'], required: true },
		{ key: 'status', label: 'Estado', type: 'select', options: ['Pendiente', 'Descargando', 'Completado'], required: true },
	],
	outOrders: [
		{ key: 'orderRef', label: 'Ref', type: 'text', required: true, auto: true, gen: 'orderRef' },
		{ key: 'client', label: 'Cliente', type: 'text', required: true },
		{ key: 'items', label: 'Uds', type: 'number', min: 0 },
		{ key: 'type', label: 'Operación', type: 'select', options: ['Estándar', 'Cross-Docking'], required: true },
		{ key: 'status', label: 'Estado', type: 'select', options: ['Pendiente', 'Empacando', 'En Ruta', 'Completada'], required: true },
	],
	routes: [
		{ key: 'routeId', label: 'ID Ruta', type: 'text', required: true, auto: true, gen: 'routeId' },
		{ key: 'driver', label: 'Transportista', type: 'text', required: true },
		{ key: 'status', label: 'Estado', type: 'select', options: ['Disponible', 'En Ruta', 'Cancelado'], required: true },
	],
	crm: [
		{ key: 'code', label: 'ID', type: 'text', required: true, auto: true, gen: 'code' },
		{ key: 'company', label: 'Empresa', type: 'text', required: true },
		{ key: 'leadScore', label: 'Lead Score', type: 'number', min: 0 },
		{ key: 'status', label: 'Fase', type: 'select', options: ['Nuevo Lead', 'En Negociación', 'Cliente Activo'], required: true },
	],
	users: [
		{ key: 'code', label: 'ID', type: 'text', required: true, auto: true, gen: 'code' },
		{ key: 'name', label: 'Operario', type: 'text', required: true },
		{ key: 'role', label: 'Rol', type: 'select', options: ['admin', 'manager', 'picker', 'formador', 'practicas'], required: true },
		{ key: 'status', label: 'Estado', type: 'select', options: ['Activo', 'Inactivo'], required: true },
	],
};
