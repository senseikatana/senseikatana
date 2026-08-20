import type { APIRoute } from "astro";
import { and, eq, ne, or, type SQL } from "drizzle-orm";
import { usuarios } from "../../../../db/schema";
import { db } from "../../../lib/db";
import { authorize } from "../../../lib/auth";
import { hashPasskey } from "../../../lib/passkey";
import { updateUserSchema, formatValidationError } from "../../../lib/validation/users";
import { publicUser } from "../../../lib/users";

export const prerender = false;

function parseId(param: string | undefined): number | null {
	if (!param) return null;
	const id = Number(param);
	return Number.isInteger(id) && id > 0 ? id : null;
}

export const GET: APIRoute = async ({ params, cookies }) => {
	const { response } = await authorize(cookies, "admin");
	if (response) return response;

	const id = parseId(params.id);
	if (id === null) return Response.json({ error: "invalid_id" }, { status: 400 });

	const [row] = await db.select().from(usuarios).where(eq(usuarios.id, id)).limit(1);
	if (!row) return Response.json({ error: "not_found" }, { status: 404 });

	return Response.json({ user: publicUser(row) });
};

export const PATCH: APIRoute = async ({ params, request, cookies }) => {
	const { response } = await authorize(cookies, "admin");
	if (response) return response;

	const id = parseId(params.id);
	if (id === null) return Response.json({ error: "invalid_id" }, { status: 400 });

	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return Response.json({ error: "invalid_body" }, { status: 400 });
	}

	const parsed = updateUserSchema.safeParse(body);
	if (!parsed.success) {
		return Response.json(formatValidationError(parsed.error), { status: 400 });
	}
	const data = parsed.data;

	const [existing] = await db.select().from(usuarios).where(eq(usuarios.id, id)).limit(1);
	if (!existing) return Response.json({ error: "not_found" }, { status: 404 });

	if (data.email || data.username) {
		const conditions: SQL[] = [];
		if (data.email) conditions.push(eq(usuarios.email, data.email));
		if (data.username) conditions.push(eq(usuarios.username, data.username));
		const clashes = await db
			.select({ email: usuarios.email, username: usuarios.username })
			.from(usuarios)
			.where(and(or(...conditions), ne(usuarios.id, id)));
		for (const row of clashes) {
			if (data.email && row.email === data.email) return Response.json({ error: "conflict", field: "email" }, { status: 409 });
			if (data.username && row.username === data.username) return Response.json({ error: "conflict", field: "username" }, { status: 409 });
		}
	}

	const [updated] = await db
		.update(usuarios)
		.set({
			...(data.name !== undefined ? { name: data.name } : {}),
			...(data.fullName !== undefined ? { fullName: data.fullName } : {}),
			...(data.phone !== undefined ? { phone: data.phone } : {}),
			...(data.email !== undefined ? { email: data.email } : {}),
			...(data.username !== undefined ? { username: data.username } : {}),
			...(data.role !== undefined ? { role: data.role } : {}),
			...(data.passkey !== undefined ? { passkeyHash: hashPasskey(data.passkey) } : {}),
		})
		.where(eq(usuarios.id, id))
		.returning();

	return Response.json({ user: publicUser(updated) });
};

export const DELETE: APIRoute = async ({ params, cookies }) => {
	const { user, response } = await authorize(cookies, "admin");
	if (response) return response;

	const id = parseId(params.id);
	if (id === null) return Response.json({ error: "invalid_id" }, { status: 400 });
	if (id === user.id) return Response.json({ error: "cannot_delete_self" }, { status: 400 });

	const [row] = await db.select({ id: usuarios.id }).from(usuarios).where(eq(usuarios.id, id)).limit(1);
	if (!row) return Response.json({ error: "not_found" }, { status: 404 });

	await db.delete(usuarios).where(eq(usuarios.id, id));
	return Response.json({ ok: true });
};
