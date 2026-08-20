import { DEFAULT_ROLES, type RoleDef } from '../auth/roles';
import { idbGet, idbSet } from '../lib/idb';

const ROLES_STORE = 'roles';
const ROLES_KEY = 'all';

type Listener = (roles: RoleDef[]) => void;

let cache: RoleDef[] | null = null;
let ready: Promise<RoleDef[]> | null = null;
const listeners = new Set<Listener>();

async function init(): Promise<RoleDef[]> {
	if (cache) return cache;
	if (!ready) {
		ready = (async () => {
			const stored = await idbGet<RoleDef[]>(ROLES_STORE, ROLES_KEY);
			cache = stored && stored.length > 0 ? stored : DEFAULT_ROLES;
			if (!stored) await idbSet(ROLES_STORE, ROLES_KEY, cache);
			return cache;
		})();
	}
	return ready;
}

export function subscribeRoles(cb: Listener): () => void {
	listeners.add(cb);
	void init().then(() => cb(cache ?? DEFAULT_ROLES));
	return () => {
		listeners.delete(cb);
	};
}

export async function saveRoles(roles: RoleDef[]): Promise<void> {
	cache = roles;
	await idbSet(ROLES_STORE, ROLES_KEY, roles);
	listeners.forEach((cb) => cb(roles));
}

export async function resetRoles(): Promise<void> {
	await saveRoles(DEFAULT_ROLES);
}
