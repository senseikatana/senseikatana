import { useEffect, useState } from 'react';
import { getStore } from '../data/store';
import { COLLECTION_KEYS, type CollectionKey, type Doc } from '../types';

export interface CollectionState {
	docs: Doc[];
	loading: boolean;
	error: string | null;
}

export type CollectionsState = Record<CollectionKey, CollectionState>;

const EMPTY_STATE = (): CollectionState => ({ docs: [], loading: true, error: null });

const createInitial = (): CollectionsState => ({
	inventory: EMPTY_STATE(),
	inOrders: EMPTY_STATE(),
	outOrders: EMPTY_STATE(),
	routes: EMPTY_STATE(),
	crm: EMPTY_STATE(),
	users: EMPTY_STATE(),
});

export function useCollections(active: boolean): CollectionsState {
	const store = getStore();
	const [state, setState] = useState<CollectionsState>(createInitial);

	useEffect(() => {
		if (!active) return;
		const unsubscribe = COLLECTION_KEYS.map((col) =>
			store.subscribeCollection(col, (docs, error) => {
				setState((prev) => ({ ...prev, [col]: { docs, loading: false, error: error ?? null } }));
			}),
		);
		return () => unsubscribe.forEach((unsub) => unsub());
	}, [store, active]);

	return state;
}
