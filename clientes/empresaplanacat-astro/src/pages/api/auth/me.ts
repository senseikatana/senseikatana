import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";
import { usuarios } from "../../../../db/schema";
import { db } from "../../../lib/db";
import { authorize, clearSessionCookie } from "../../../lib/auth";
import { publicUser } from "../../../lib/users";

export const prerender = false;

export const GET: APIRoute = async ({ cookies }) => {
	const { user, response } = await authorize(cookies);
	if (response) return response;

	const [row] = await db.select().from(usuarios).where(eq(usuarios.id, user.id)).limit(1);
	if (!row) {
		clearSessionCookie(cookies);
		return Response.json({ error: "unauthorized" }, { status: 401 });
	}

	return Response.json({ user: publicUser(row) });
};
