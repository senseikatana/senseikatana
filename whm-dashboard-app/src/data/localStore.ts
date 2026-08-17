import { idbGet, idbSet } from '../lib/idb';
import type { CollectionKey, Doc } from '../types';
import { seedData } from './seed';
import type { AppStore } from './store';

const COLLECTION_STORE = 'collections';
const SEED_VERSION = '2';
const SEED_VERSION_KEY = 'whm.seed.version';

type Listener = (docs: Doc[]) => void;

export function createLocalStore(): AppStore {
	return new LocalStore();
}

class LocalStore implements AppStore {
	readonly kind = 'local' as const;

	private readonly listeners = new Map<CollectionKey, Set<Listener>>();
	private readonly cache = new Map<CollectionKey, Doc[]>();
	private ready: Promise<void>;
	private channel: BroadcastChannel | null = null;

	constructor() {
		this.ready = this.init();
	}

	private async init(): Promise<void> {
		for (const col of Object.keys(seedData) as CollectionKey[]) {
			const docs = await idbGet<Doc[]>(COLLECTION_STORE, col);
			if (docs === undefined) {
				const rows = seedData[col].map((row) => ({
					id: this.newId(),
					...row,
					createdAt: Date.now(),
				}));
				await idbSet(COLLECTION_STORE, col, rows);
				this.cache.set(col, rows);
			} else {
				this.cache.set(col, docs);
			}
		}

		if (typeof BroadcastChannel !== 'undefined') {
			this.channel = new BroadcastChannel('whm.local');
			this.channel.onmessage = (event: MessageEvent<{ col: CollectionKey }>) => {
				void this.reload(event.data?.col);
			};
		}

		if (localStorage.getItem(SEED_VERSION_KEY) !== SEED_VERSION) {
			await this.mergeSeedUsers();
			localStorage.setItem(SEED_VERSION_KEY, SEED_VERSION);
		}
	}

	private async mergeSeedUsers(): Promise<void> {
		const col = 'users';
		const existing = (await idbGet<Doc[]>(COLLECTION_STORE, col)) ?? [];
		const existingCodes = new Set(existing.map((doc) => doc.code));
		const missing = seedData[col].filter((row) => !existingCodes.has(String(row.code)));
		if (missing.length === 0) return;
		const rows = missing.map((row) => ({ id: this.newId(), ...row, createdAt: Date.now() }));
		const merged = [...existing, ...rows];
		await idbSet(COLLECTION_STORE, col, merged);
		this.cache.set(col, merged);
		this.notify(col);
	}

	private newId(): string {
		return crypto.randomUUID();
	}

	private async reload(col: CollectionKey): Promise<void> {
		if (col === undefined) return;
		const docs = (await idbGet<Doc[]>(COLLECTION_STORE, col)) ?? [];
		this.cache.set(col, docs);
		this.notify(col);
	}

	private async commit(col: CollectionKey, docs: Doc[]): Promise<void> {
		await idbSet(COLLECTION_STORE, col, docs);
		this.cache.set(col, docs);
		this.notify(col);
		this.channel?.postMessage({ col });
	}

	private notify(col: CollectionKey): void {
		const docs = this.cache.get(col) ?? [];
		this.listeners.get(col)?.forEach((cb) => cb(docs));
	}

	subscribeCollection(col: CollectionKey, cb: Listener): () => void {
		const set = this.listeners.get(col) ?? new Set();
		set.add(cb);
		this.listeners.set(col, set);
		void this.ready.then(() => cb(this.cache.get(col) ?? []));
		return () => {
			set.delete(cb);
		};
	}

	async create(col: CollectionKey, data: Record<string, unknown>): Promise<string> {
		await this.ready;
		const id = this.newId();
		const docs = [...(this.cache.get(col) ?? []), { id, ...data, createdAt: Date.now() }];
		await this.commit(col, docs);
		return id;
	}

	async createMany(col: CollectionKey, items: Record<string, unknown>[]): Promise<void> {
		if (items.length === 0) return;
		await this.ready;
		const createdAt = Date.now();
		const docs = [
			...(this.cache.get(col) ?? []),
			...items.map((item) => ({ id: this.newId(), ...item, createdAt })),
		];
		await this.commit(col, docs);
	}

	async update(col: CollectionKey, id: string, data: Record<string, unknown>): Promise<void> {
		await this.ready;
		const docs = (this.cache.get(col) ?? []).map((doc) =>
			doc.id === id ? { ...doc, ...data } : doc,
		);
		await this.commit(col, docs);
	}

	async remove(col: CollectionKey, id: string): Promise<void> {
		await this.ready;
		const docs = (this.cache.get(col) ?? []).filter((doc) => doc.id !== id);
		await this.commit(col, docs);
	}

	async batchDelete(col: CollectionKey, ids: string[]): Promise<void> {
		await this.ready;
		const toDelete = new Set(ids);
		const docs = (this.cache.get(col) ?? []).filter((doc) => !toDelete.has(doc.id));
		await this.commit(col, docs);
	}
}
