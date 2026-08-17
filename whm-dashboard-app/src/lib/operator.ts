import { resolveRoleId } from '../auth/roles';
import type { Operator } from '../types';

const OPERATOR_KEY = 'whm.operator';

export const DEFAULT_OPERATOR: Operator = {
	uid: 'demo',
	name: 'Demo',
	roleId: 'admin',
};

export const operatorStore = {
	load(): Operator | null {
		try {
			const raw = localStorage.getItem(OPERATOR_KEY);
			if (!raw) return null;
			const parsed = JSON.parse(raw) as Partial<Operator> & { role?: string };
			return {
				uid: String(parsed.uid ?? DEFAULT_OPERATOR.uid),
				name: String(parsed.name ?? DEFAULT_OPERATOR.name),
				roleId: resolveRoleId(parsed.roleId ?? parsed.role),
			};
		} catch {
			return null;
		}
	},
	save(operator: Operator) {
		localStorage.setItem(OPERATOR_KEY, JSON.stringify(operator));
	},
	clear() {
		localStorage.removeItem(OPERATOR_KEY);
	},
};
