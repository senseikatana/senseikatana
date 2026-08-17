import { createClient, type SupabaseClient, type User } from '@supabase/supabase-js';

const SUPABASE_URL: string | undefined = import.meta.env.PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY: string | undefined = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_SECRET_KEY: string | undefined = process.env.SUPABASE_SECRET_KEY;




const supabase = createClient(url, secretKey, {
	auth: { persistSession: false, autoRefreshToken: false },
});





let client: SupabaseClient | null = null;
if (typeof window !== 'undefined' && SUPABASE_URL && SUPABASE_ANON_KEY) {
	client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

export function isSupabaseConfigured(): boolean {
	return client !== null;
}

export function getSupabase(): SupabaseClient {
	if (!client) throw new Error('Supabase no está configurado.');
	return client;
}

export async function getSessionToken(): Promise<string | null> {
	if (!client) return null;
	const { data } = await client.auth.getSession();
	return data.session?.access_token ?? null;
}

export interface ProfileRow {
	name: string | null;
	role_id: string | null;
}

export async function fetchProfile(user: User | null): Promise<ProfileRow | null> {
	if (!client || !user) return null;
	const metadata = user.user_metadata as { name?: string; role_id?: string } | undefined;
	const { data, error } = await client
		.from('profiles')
		.select('name, role_id')
		.eq('id', user.id)
		.maybeSingle();
	if (!error && data) {
		return {
			name: data.name ?? metadata?.name ?? null,
			role_id: data.role_id ?? metadata?.role_id ?? null,
		};
	}
	return {
		name: metadata?.name ?? null,
		role_id: metadata?.role_id ?? null,
	};
}

export interface SignUpInput {
	email: string;
	password: string;
	name: string;
	roleId: string;
}

export interface SignUpResult {
	error: string | null;
	needsConfirmation: boolean;
}

export async function signUp(input: SignUpInput): Promise<SignUpResult> {
	if (!client) return { error: 'Supabase no está configurado.', needsConfirmation: false };
	const { data, error } = await client.auth.signUp({
		email: input.email,
		password: input.password,
		options: { data: { name: input.name, role_id: input.roleId } },
	});
	if (error) return { error: error.message, needsConfirmation: false };
	return { error: null, needsConfirmation: data.session === null };
}
