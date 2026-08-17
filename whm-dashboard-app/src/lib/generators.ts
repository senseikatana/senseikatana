import type { CollectionKey } from '../types';
import { generateUniqueNutCode } from './nut-codes-generator';

const range = (min: number, max: number): number =>
	Math.floor(Math.random() * (max - min + 1)) + min;

const pad = (num: number, size: number): string => String(num).padStart(size, '0');

export function generateRef(prefix: string): string {
	return `${prefix}-${new Date().getFullYear()}-${range(1000, 9999)}`;
}

export function generateRouteId(): string {
	return `R-${pad(range(1, 999), 3)}`;
}

export function generateCode(prefix: string): string {
	return `${prefix}-${pad(range(1, 9999), 4)}`;
}

export function generateFieldValue(
	entity: CollectionKey,
	fieldKey: string,
	_form: Record<string, unknown>,
	existingValues: (string | number)[] = [],
): string {
	switch (fieldKey) {
		case 'sku': {
			const usedNutCodes = existingValues
				.map((value) => String(value))
				.filter((value) => /^nut/i.test(value));
			return generateUniqueNutCode(usedNutCodes);
		}
		case 'orderRef':
			return generateRef(entity === 'inOrders' ? 'IN' : 'OUT');
		case 'routeId':
			return generateRouteId();
		case 'code':
			return generateCode(entity === 'crm' ? 'CL' : 'OP');
		default:
			return '';
	}
}

export function isGenerable(fieldKey: string): boolean {
	return fieldKey === 'sku' || fieldKey === 'orderRef' || fieldKey === 'routeId' || fieldKey === 'code';
}
