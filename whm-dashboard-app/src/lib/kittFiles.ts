import { idbDelete, idbGet, idbKeys, idbSet } from './idb';
import type { SpreadsheetData } from './excel';

const FILES_STORE = 'kitt-files';

export interface KittFile extends SpreadsheetData {
	id: string;
	loadedAt: number;
}

export async function listKittFiles(): Promise<KittFile[]> {
	const keys = await idbKeys(FILES_STORE);
	const files: KittFile[] = [];
	for (const key of keys) {
		const file = await idbGet<KittFile>(FILES_STORE, key);
		if (file) files.push(file);
	}
	return files.sort((a, b) => b.loadedAt - a.loadedAt);
}

export async function saveKittFile(data: SpreadsheetData): Promise<KittFile> {
	const file: KittFile = { ...data, id: crypto.randomUUID(), loadedAt: Date.now() };
	await idbSet(FILES_STORE, file.id, file);
	return file;
}

export async function removeKittFile(id: string): Promise<void> {
	await idbDelete(FILES_STORE, id);
}

export async function listNutProducts(): Promise<string[]> {
	const files = await listKittFiles();
	const seen = new Set<string>();
	for (const file of files) {
		for (const row of file.rows) {
			const name = String(row.producto ?? row.name ?? '').trim();
			if (name) seen.add(name);
		}
	}
	return [...seen];
}
