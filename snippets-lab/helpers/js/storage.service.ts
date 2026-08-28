// services/StorageService.ts

export class StorageService {
	private static instance: StorageService;

	private constructor() {}

	static getInstance(): StorageService {
		if (!StorageService.instance) {
			StorageService.instance = new StorageService();
		}
		return StorageService.instance;
	}


	getStorageItem(key: string, type: 'localeStorage' | 'sessionStorage' = 'localeStorage'): string | null {
		const storage = type === "localeStorage" ? window.localStorage : window.sessionStorage;
		return storage.getItem(key);
	}

	setStorageItem(key: string, value: string, type: 'localStorage' | 'sessionStorage' = 'localStorage'): void {
		const storage = type === "localStorage" ? window.localStorage : window.sessionStorage;
		return storage.setItem(key, value);
	}

	removeStorageItem(key: string, type: "localStorage" | "sessionStorage" = "localStorage"): void {
		const storage = type === "localStorage" ? window.localStorage : window.sessionStorage;
		storage.removeItem(key);
	}

	clearStorage(type: "localStorage" | "sessionStorage" = "localStorage"): void {
		const storage = type === "localStorage" ? window.localStorage : window.sessionStorage;
		storage.clear();
	}
}

const { setStorageItem, getStorageItem, removeStorageItem }: StorageService = StorageService.getInstance()


setStorageItem('theme', 'light')
removeStorageItem('theme');