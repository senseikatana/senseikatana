import type { APIRoute } from "astro";
import { eq, or } from "drizzle-orm";
import { USUARIO_ROLES, usuarios, type UsuarioRole } from "../../../../db/schema";
import { db } from "../../../lib/db";
import { authorize } from "../../../lib/auth";
import { hashPasskey } from "../../../lib/passkey";
import { createUserSchema, formatValidationError } from "../../../lib/validation/users";
import { publicUser } from "../../../lib/users";

export const prerender = false;

export const GET: APIRoute = async ({ cookies, url }) => {
	const { response } = await authorize(cookies, "admin");
	if (response) return response;

	const roleParam = url.searchParams.get("role");
	const role = USUARIO_ROLES.includes(roleParam as UsuarioRole) ? (roleParam as UsuarioRole) : undefined;

	const rows = role
		? await db.select().from(usuarios).where(eq(usuarios.role, role))
		: await db.select().from(usuarios);
	return Response.json({ users: rows.map(publicUser) });
};

export const POST: APIRoute = async ({ request, cookies }) => {
	const { response } = await authorize(cookies, "admin");
	if (response) return response;

	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return Response.json({ error: "invalid_body" }, { status: 400 });
	}

	const parsed = createUserSchema.safeParse(body);
	if (!parsed.success) {
		return Response.json(formatValidationError(parsed.error), { status: 400 });
	}
	const data = parsed.data;

	const conflicts = await db
		.select({ email: usuarios.email, username: usuarios.username })
		.from(usuarios)
		.where(or(eq(usuarios.email, data.email), eq(usuarios.username, data.username)));
	for (const row of conflicts) {
		if (row.email === data.email) return Response.json({ error: "conflict", field: "email" }, { status: 409 });
		if (row.username === data.username) return Response.json({ error: "conflict", field: "username" }, { status: 409 });
	}

	const [created] = await db
		.insert(usuarios)
		.values({
			name: data.name,
			fullName: data.fullName,
			phone: data.phone,
			email: data.email,
			passkeyHash: hashPasskey(data.passkey),
			username: data.username,
			role: data.role,
		})
		.returning();

	return Response.json({ user: publicUser(created) }, { status: 201 });
};
