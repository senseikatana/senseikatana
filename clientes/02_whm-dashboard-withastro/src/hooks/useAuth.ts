import { useCallback, useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { resolveRoleId } from '../auth/roles';
import { DEFAULT_OPERATOR, operatorStore } from '../lib/operator';
import { fetchProfile, getSupabase, isSupabaseConfigured, signUp } from '../lib/supabase';
import type { Operator, Session } from '../types';

export type AuthMode = 'supabase' | 'demo';

export interface RegisterInput {
	email: string;
	password: string;
	name: string;
	roleId: string;
}

interface UseAuthResult {
	status: 'loading' | 'ready';
	authMode: AuthMode;
	session: Session | null;
	signIn: (operator: Operator) => void;
	signInWithPassword: (email: string, password: string) => Promise<string | null>;
	register: (input: RegisterInput) => Promise<{ error: string | null; needsConfirmation: boolean }>;
	signOut: () => Promise<void>;
}

async function resolveSession(user: User | null): Promise<Session | null> {
	if (!user) return null;
	try {
		const profile = await fetchProfile(user);
		return {
			uid: user.id,
			name: profile?.name || user.email || 'Usuario',
			roleId: resolveRoleId(profile?.role_id ?? undefined),
		};
	} catch {
		return { uid: user.id, name: user.email ?? 'Usuario', roleId: 'picker' };
	}
}

export function useAuth(): UseAuthResult {
	const [session, setSession] = useState<Session | null>(null);
	const [status, setStatus] = useState<'loading' | 'ready'>('loading');
	const authMode: AuthMode = isSupabaseConfigured() ? 'supabase' : 'demo';

	useEffect(() => {
		if (!isSupabaseConfigured()) {
			setSession(operatorStore.load() ?? DEFAULT_OPERATOR);
			setStatus('ready');
			return;
		}
		let disposed = false;
		const supabase = getSupabase();
		void supabase.auth.getSession().then(async ({ data }) => {
			if (disposed) return;
			const next = await resolveSession(data.session?.user ?? null);
			if (!disposed) {
				setSession(next);
				setStatus('ready');
			}
		});
		const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
			void resolveSession(nextSession?.user ?? null).then((next) => {
				if (!disposed) setSession(next);
			});
		});
		return () => {
			disposed = true;
			subscription.subscription.unsubscribe();
		};
	}, []);

	const signIn = useCallback((operator: Operator) => {
		operatorStore.save(operator);
		setSession({ uid: operator.uid, name: operator.name, roleId: operator.roleId });
		setStatus('ready');
	}, []);

	const signInWithPassword = useCallback(async (email: string, password: string) => {
		const { error } = await getSupabase().auth.signInWithPassword({ email, password });
		return error ? error.message : null;
	}, []);

	const register = useCallback(async (input: RegisterInput) => {
		return signUp(input);
	}, []);

	const signOut = useCallback(async () => {
		if (isSupabaseConfigured()) {
			await getSupabase().auth.signOut();
		}
		operatorStore.clear();
		setSession(null);
	}, []);

	return { status, authMode, session, signIn, signInWithPassword, register, signOut };
}
