import { SignJWT, jwtVerify } from "jose";
import type { AstroCookies } from "astro";
import type { UsuarioRole } from "../../db/schema";

const SESSION_COOKIE = "ep_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;
const ISSUER = "empresaplana";

export interface SessionUser {
	id: number;
	username: string;
	role: UsuarioRole;
}

function secret(): Uint8Array {
	const value = import.meta.env.AUTH_SECRET;
	if (!value) {
		throw new Error("AUTH_SECRET is not set. Copy .env.example to .env and set a long random secret.");
	}
	return new TextEncoder().encode(value);
}

export async function signSessionToken(user: SessionUser): Promise<string> {
	return new SignJWT({ username: user.username, role: user.role })
		.setSubject(String(user.id))
		.setIssuer(ISSUER)
		.setIssuedAt()
		.setExpirationTime("7d")
		.setProtectedHeader({ alg: "HS256" })
		.sign(secret());
}

export async function getSession(cookies: AstroCookies): Promise<SessionUser | null> {
	const token = cookies.get(SESSION_COOKIE)?.value;
	if (!token) return null;
	try {
		const { payload } = await jwtVerify(token, secret(), { issuer: ISSUER });
		const id = Number(payload.sub);
		if (!Number.isInteger(id) || typeof payload.username !== "string") return null;
		return { id, username: payload.username, role: payload.role as UsuarioRole };
	} catch {
		return null;
	}
}

export function setSessionCookie(cookies: AstroCookies, token: string): void {
	cookies.set(SESSION_COOKIE, token, {
		httpOnly: true,
		sameSite: "lax",
		secure: import.meta.env.PROD,
		path: "/",
		maxAge: SESSION_MAX_AGE,
	});
}

export function clearSessionCookie(cookies: AstroCookies): void {
	cookies.delete(SESSION_COOKIE, { path: "/" });
}

export async function authorize(cookies: AstroCookies, role?: UsuarioRole) {
	const session = await getSession(cookies);
	if (!session) {
		return { user: null, response: Response.json({ error: "unauthorized" }, { status: 401 }) };
	}
	if (role && session.role !== role && session.role !== "admin") {
		return { user: null, response: Response.json({ error: "forbidden" }, { status: 403 }) };
	}
	return { user: session, response: null };
}
