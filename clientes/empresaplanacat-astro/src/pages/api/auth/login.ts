import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";
import { usuarios } from "../../../../db/schema";
import { db } from "../../../lib/db";
import { setSessionCookie, signSessionToken } from "../../../lib/auth";
import { verifyPasskey } from "../../../lib/passkey";
import { loginSchema, formatValidationError } from "../../../lib/validation/users";
import { publicUser } from "../../../lib/users";

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return Response.json({ error: "invalid_body" }, { status: 400 });
	}

	const parsed = loginSchema.safeParse(body);
	if (!parsed.success) {
		return Response.json(formatValidationError(parsed.error), { status: 400 });
	}

	const { username, passkey } = parsed.data;
	const [user] = await db.select().from(usuarios).where(eq(usuarios.username, username)).limit(1);
	if (!user || !verifyPasskey(passkey, user.passkeyHash)) {
		return Response.json({ error: "invalid_credentials" }, { status: 401 });
	}

	const token = await signSessionToken({ id: user.id, username: user.username, role: user.role });
	setSessionCookie(cookies, token);
	return Response.json({ user: publicUser(user) });
};
