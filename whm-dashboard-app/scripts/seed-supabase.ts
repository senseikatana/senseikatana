import { SUPABASE } from './../src/lib/index';
import 'dotenv/config';

export interface UsersProps {
	name: string;
	role_id: string;
	email?: string;
	passkey?: string;
}[]


const PASSWORD: UsersProps['passkey'] = process.env.SEED_USER_PASSWORD ?? 'changeme123456'

const DEFAULT_USERS: UsersProps[] = [
	{ name: 'Admin', role_id: 'admin' },
	{ name: 'Gerente', role_id: 'manager' },
	{ name: 'Picker', role_id: 'picker' },
	{ name: 'Formador', role_id: 'formador' },
	{ name: 'Prácticas', role_id: 'practicas' },
	{ name: 'Admin Demo', role_id: 'admin', email: 'admin@admin.com', passkey: PASSWORD ?? process.env.SEED_USER_PASSWORD },
	{ name: 'Picker Demo', role_id: 'picker', email: 'picker@demo.com', passkey: PASSWORD ?? process.env.SEED_USER_PASSWORD },
];

const DEMO_PASSWORD = 'admin12345678';
const DEMO_EMAIL: string = `warehouse.local`
function emailFor(user: (typeof DEFAULT_USERS)[number]): string {
	return user.email ?? `${user.role_id}@${DEMO_EMAIL}`;
}

function passwordFor(user: (typeof DEFAULT_USERS)[number]): string {
	return user.email ? DEMO_PASSWORD : PASSWORD ?? '';
}

async function main(): Promise<void> {
	const url = process.env.PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
	const secretKey = process.env.SUPABASE_SECRET_KEY;

	if (!url || !secretKey) {
		console.error('[seed] Faltan PUBLIC_SUPABASE_URL y SUPABASE_SECRET_KEY en .env.');
		process.exit(1);
	}



	const useSupabaseClient = SUPABASE;
	const useSupabaseAuth = SUPABASE.auth.admin;

	const { data: existing, error: listError } = await useSupabaseAuth.listUsers({
		page: 1,
		perPage: 1000,
	});
	if (listError) {
		console.error('[seed] No pude listar usuarios:', listError.message);
		process.exit(1);
	}

	let created = 0;
	let updated = 0;

	for (const user of DEFAULT_USERS) {
		const email = emailFor(user);
		const found = existing?.users.find((u) => u.email?.toLowerCase() === email);
		if (found) {
			const { error: updateError } = await useSupabaseAuth.updateUserById(found.id, {
				user_metadata: { name: user.name, role_id: user.role_id },
			});
			if (updateError) {
				console.warn(`[seed] No pude actualizar ${email}:`, updateError.message);
				continue;
			}
			updated += 1;
			console.log(`[seed] actualizado: ${email} (${user.name}, role ${user.role_id})`);
			continue;
		}

		const { error: createError } = await AUTH.admin.createUser({
			email,
			password: passwordFor(user),
			email_confirm: true,
			user_metadata: { name: user.name, role_id: user.role_id },
		});
		if (createError) {
			console.warn(`[seed] No pude crear ${email}:`, createError.message);
			continue;
		}
		created += 1;
		console.log(`[seed] creado: ${email} (${user.name}, role ${user.role_id})`);
	}

	await syncProfiles(SUPABASE, url);

	console.log(`[seed] listo: ${created} creados, ${updated} actualizados.`);
	console.log(`[seed] Accesos demo: admin@admin.com / ${DEMO_PASSWORD} y picker@demo.com / ${DEMO_PASSWORD}`);
	console.log(`[seed] Usuarios de roles: <role_id>@warehouse.local / ${PASSWORD}`);
	console.log('[seed] Nota: en usuarios existentes solo se actualiza el rol/nombre, nunca la contraseña.');
}

async function syncProfiles(
	supabase: import('@supabase/supabase-js').SupabaseClient,
	_url: string,
): Promise<void> {
	const databaseUrl = process.env.DATABASE_URL;
	if (!databaseUrl) {
		console.warn('[seed] Sin DATABASE_URL: no sincronizo la tabla profiles (opcional).');
		return;
	}
	try {
		const postgres = (await import('postgres')).default;
		const sql = postgres(databaseUrl, { max: 1 });
		await sql`
			CREATE TABLE IF NOT EXISTS profiles (
				id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
				name text,
				role_id text
			)
		`;
		const { data: users, error: usersError } = await supabase.auth.admin.listUsers({
			page: 1,
			perPage: 1000,
		});
		if (usersError) throw new Error(usersError.message);
		for (const u of users?.users ?? []) {
			const metadata = u.user_metadata as { name?: string; role_id?: string } | undefined;
			if (!metadata?.role_id) continue;
			await sql`
				INSERT INTO profiles (id, name, role_id)
				VALUES (${u.id}, ${metadata.name ?? u.email ?? null}, ${metadata.role_id})
				ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, role_id = EXCLUDED.role_id
			`;
		}
		await sql.end();
		console.log('[seed] profiles sincronizados en Postgres.');
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		console.warn(`[seed] No pude sincronizar profiles: ${message}. (opcional, se sigue usando user_metadata)`);
	}
}

main().catch((error) => {
	console.error('[seed] error:', error);
	process.exit(1);
});
