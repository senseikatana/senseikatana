import { useEffect, useState } from 'react';
import { getStore } from '../data/store';
import type { CollectionKey, Doc } from '../types';

export interface CollectionState {
	docs: Doc[];
	loading: boolean;
	error: string | null;
}

export function useCollection(col: CollectionKey, active: boolean): CollectionState {
	const store = getStore();
	const [state, setState] = useState<CollectionState>({
		docs: [],
		loading: true,
		error: null,
	});

	useEffect(() => {
		if (!active) return;
		return store.subscribeCollection(col, (docs, error) => {
			setState({ docs, loading: false, error: error ?? null });
		});
	}, [store, col, active]);

	return state;
}
