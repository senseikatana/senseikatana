import type { CollectionKey } from '../types';

export interface SuggestionSource {
	type: 'self' | 'cross' | 'nut';
	collection?: CollectionKey;
	field?: string;
}

export const SUGGESTIONS: Partial<Record<string, SuggestionSource>> = {
	'outOrders.client': { type: 'cross', collection: 'crm', field: 'company' },
	'inventory.name': { type: 'nut' },
};
