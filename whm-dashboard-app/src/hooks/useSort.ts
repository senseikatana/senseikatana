import { useMemo, useState } from 'react';
import type { Doc, FieldDef } from '../types';

export type SortDirection = 'asc' | 'desc';

export function useSort(docs: Doc[], fields: readonly FieldDef[]) {
	const [sortKey, setSortKey] = useState<string | null>(null);
	const [direction, setDirection] = useState<SortDirection>('asc');

	const toggleSort = (key: string) => {
		if (sortKey === key) {
			setDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
		} else {
			setSortKey(key);
			setDirection('asc');
		}
	};

	const sortedDocs = useMemo(() => {
		if (!sortKey) return docs;
		const isNumber = fields.find((field) => field.key === sortKey)?.type === 'number';
		const factor = direction === 'asc' ? 1 : -1;
		return [...docs].sort((a, b) => {
			if (isNumber) {
				return ((Number(a[sortKey]) || 0) - (Number(b[sortKey]) || 0)) * factor;
			}
			return String(a[sortKey] ?? '').localeCompare(String(b[sortKey] ?? '')) * factor;
		});
	}, [docs, fields, sortKey, direction]);

	return { sortedDocs, sortKey, direction, toggleSort };
}
