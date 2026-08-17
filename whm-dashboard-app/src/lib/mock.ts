import type { CollectionKey } from '../types';
import { generateCode } from './generators';
import { generateUniqueNutCode } from './nut-codes-generator';

const pick = <T>(values: readonly [T, ...T[]]): T =>
	values[Math.floor(Math.random() * values.length)];

const range = (min: number, max: number): number =>
	Math.floor(Math.random() * (max - min + 1)) + min;

const ref = (prefix: string): string =>
	`${prefix}-${new Date().getFullYear()}-${range(1000, 9999)}`;

const PRODUCTS = [
	'Smartphone Samsung A54',
	'Laptop Dell XPS 15',
	'Tablet iPad Pro',
	'Monitor LG 27"',
	'Teclado Logitech K380',
	'Mouse Inalámbrico',
	'Auriculares Sony WH-1000XM5',
	'Smartwatch Garmin Venu',
	'Cámara Canon EOS R50',
	'Impresora HP LaserJet',
	'Router TP-Link Archer',
	'Disco SSD 1TB Kingston',
] as const;

const SUPPLIERS = [
	'Samsung Distribución',
	'Logitech Iberia',
	'Dell EMC',
	'Sony Retail',
	'Canon Europe',
	'TP-Link Wholesale',
] as const;

const CLIENTS = [
	'Mercado Libre',
	'El Corte Inglés',
	'Amazon Vendor',
	'Carrefour',
	'MediaMarkt',
	'Fnac',
	'Ripley',
	'Falabella',
] as const;

const DRIVERS = ['Carlos Méndez', 'Laura Gómez', 'Jorge Pereyra', 'Ana Sosa', 'Pablo Ríos'] as const;

const COMPANIES = [
	'LogistiK S.A.',
	'FarmaPlus',
	'RetailAndes',
	'TechCorp Argentina',
	'MegaShop',
	'Importadora Sur',
] as const;

const OPERATORS = [
	'Martín Ruiz',
	'Valentina Díaz',
	'Santiago López',
	'Camila Torres',
	'Joaquín Pereyra',
] as const;

const ABC = ['A', 'A', 'B', 'B', 'B', 'C'] as const;

const STATUS_IN = ['Pendiente', 'Descargando', 'Completado'] as const;
const STATUS_OUT = ['Pendiente', 'Empacando', 'En Ruta', 'Completada'] as const;
const STATUS_ROUTE = ['Disponible', 'En Ruta', 'Cancelado'] as const;
const STATUS_CRM = ['Nuevo Lead', 'En Negociación', 'Cliente Activo'] as const;
const STATUS_USER = ['Activo', 'Activo', 'Activo', 'Inactivo'] as const;
const ROLES = ['Picker', 'Picker', 'Manager', 'Admin'] as const;

export function generateMock(collection: CollectionKey, count: number): Record<string, unknown>[] {
	const items: Record<string, unknown>[] = [];
	const nutCodes: string[] = [];

	for (let i = 0; i < count; i++) {
		switch (collection) {
			case 'inventory': {
				const name = pick(PRODUCTS);
				const min = range(5, 30);
				const stock = Math.random() < 0.25 ? range(0, min) : range(min, min * 8);
				const status = stock <= min * 0.4 ? 'Crítico' : stock < min ? 'Bajo' : 'OK';
				const abcClass = pick(ABC);
				const sku = generateUniqueNutCode(nutCodes);
				nutCodes.push(sku);
				items.push({
					sku,
					name,
					abcClass,
					stock,
					min,
					status,
				});
				break;
			}
			case 'inOrders':
				items.push({
					orderRef: ref('IN'),
					supplier: pick(SUPPLIERS),
					items: range(10, 500),
					type: pick(['Estocaje', 'Cross-Docking'] as const),
					status: pick(STATUS_IN),
				});
				break;
			case 'outOrders':
				items.push({
					orderRef: ref('OUT'),
					client: pick(CLIENTS),
					items: range(5, 200),
					type: pick(['Estándar', 'Cross-Docking'] as const),
					status: pick(STATUS_OUT),
				});
				break;
			case 'routes':
				items.push({ routeId: ref('R'), driver: pick(DRIVERS), status: pick(STATUS_ROUTE) });
				break;
			case 'crm':
				items.push({
					code: generateCode('CL'),
					company: pick(COMPANIES),
					leadScore: range(20, 95),
					status: pick(STATUS_CRM),
				});
				break;
			case 'users':
				items.push({
					code: generateCode('OP'),
					name: pick(OPERATORS),
					role: pick(ROLES),
					status: pick(STATUS_USER),
				});
				break;
		}
	}

	return items;
}
