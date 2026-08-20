const DB_NAME = 'whm-db';
const DB_VERSION = 3;

let dbPromise: Promise<IDBDatabase> | null = null;

function openDb(): Promise<IDBDatabase> {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);
		request.onupgradeneeded = () => {
			const db = request.result;
			if (!db.objectStoreNames.contains('collections')) {
				db.createObjectStore('collections');
			}
			if (!db.objectStoreNames.contains('messages')) {
				db.createObjectStore('messages');
			}
			if (!db.objectStoreNames.contains('kitt-files')) {
				db.createObjectStore('kitt-files');
			}
			if (!db.objectStoreNames.contains('roles')) {
				db.createObjectStore('roles');
			}
		};
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

function idb(): Promise<IDBDatabase> {
	if (!dbPromise) dbPromise = openDb();
	return dbPromise;
}

function txDone(tx: IDBTransaction): Promise<void> {
	return new Promise((resolve, reject) => {
		tx.oncomplete = () => resolve();
		tx.onerror = () => reject(tx.error);
		tx.onabort = () => reject(tx.error);
	});
}

export async function idbGet<T>(store: string, key: IDBValidKey): Promise<T | undefined> {
	const db = await idb();
	return new Promise((resolve, reject) => {
		const request = db.transaction(store, 'readonly').objectStore(store).get(key);
		request.onsuccess = () => resolve(request.result as T | undefined);
		request.onerror = () => reject(request.error);
	});
}

export async function idbSet(store: string, key: IDBValidKey, value: unknown): Promise<void> {
	const db = await idb();
	const tx = db.transaction(store, 'readwrite');
	tx.objectStore(store).put(value, key);
	await txDone(tx);
}

export async function idbKeys(store: string): Promise<IDBValidKey[]> {
	const db = await idb();
	return new Promise((resolve, reject) => {
		const request = db.transaction(store, 'readonly').objectStore(store).getAllKeys();
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

export async function idbDelete(store: string, key: IDBValidKey): Promise<void> {
	const db = await idb();
	const tx = db.transaction(store, 'readwrite');
	tx.objectStore(store).delete(key);
	await txDone(tx);
}
