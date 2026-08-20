import { useMemo, useState } from 'react';
import type { Doc, FieldDef } from '../types';

export interface NumberFilter {
	min: string;
	max: string;
}

export interface FilterState {
	query: string;
	selects: Record<string, string>;
	numbers: Record<string, NumberFilter>;
}

const EMPTY_FILTERS: FilterState = { query: '', selects: {}, numbers: {} };

export function useFilters(docs: Doc[], fields: readonly FieldDef[]) {
	const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);

	const setQuery = (query: string) => setFilters((prev) => ({ ...prev, query }));

	const setSelect = (key: string, value: string) =>
		setFilters((prev) => ({ ...prev, selects: { ...prev.selects, [key]: value } }));

	const setNumber = (key: string, part: 'min' | 'max', value: string) =>
		setFilters((prev) => ({
			...prev,
			numbers: {
				...prev.numbers,
				[key]: { ...prev.numbers[key], [part]: value },
			},
		}));

	const clear = () => setFilters(EMPTY_FILTERS);

	const activeCount = useMemo(() => {
		let count = filters.query.trim() ? 1 : 0;
		for (const value of Object.values(filters.selects)) {
			if (value) count += 1;
		}
		for (const range of Object.values(filters.numbers)) {
			if (range.min || range.max) count += 1;
		}
		return count;
	}, [filters]);

	const filteredDocs = useMemo(() => {
		const query = filters.query.trim().toLowerCase();
		return docs.filter((doc) => {
			if (query) {
				const haystack = fields
					.map((field) => String(doc[field.key] ?? ''))
					.join(' ')
					.toLowerCase();
				if (!haystack.includes(query)) return false;
			}
			for (const [key, value] of Object.entries(filters.selects)) {
				if (value && String(doc[key] ?? '') !== value) return false;
			}
			for (const [key, range] of Object.entries(filters.numbers)) {
				const current = Number(doc[key]);
				if (Number.isNaN(current)) continue;
				if (range.min && current < Number(range.min)) return false;
				if (range.max && current > Number(range.max)) return false;
			}
			return true;
		});
	}, [docs, fields, filters]);

	return { filteredDocs, filters, setQuery, setSelect, setNumber, clear, activeCount };
}
