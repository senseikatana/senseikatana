import { useEffect, useState } from 'react';
import { DEFAULT_ROLES, type RoleDef } from '../auth/roles';
import { subscribeRoles } from '../data/rolesStore';

export function useRoles() {
	const [roles, setRoles] = useState<RoleDef[]>(DEFAULT_ROLES);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = subscribeRoles((next) => {
			setRoles(next);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	return { roles, loading };
}
