import { createRemoteJWKSet, jwtVerify } from 'jose';
import type { NextFunction, Request, Response } from 'express';

const JWKS_URL = process.env.SUPABASE_JWKS_URL;

let jwks: ReturnType<typeof createRemoteJWKSet> | null = null;
let issuer: string | null = null;
if (JWKS_URL) {
	try {
		jwks = createRemoteJWKSet(new URL(JWKS_URL));
		issuer = `${new URL(JWKS_URL).origin}/auth/v1`;
	} catch {
		jwks = null;
	}
}

export function isAuthEnabled(): boolean {
	return jwks !== null;
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
	if (!jwks) {
		next();
		return;
	}
	const header = req.headers.authorization ?? '';
	const queryToken = typeof req.query.token === 'string' ? req.query.token : undefined;
	const token = header.startsWith('Bearer ') ? header.slice('Bearer '.length) : queryToken;
	if (!token) {
		res.status(401).json({ error: 'No autenticado: falta token.' });
		return;
	}
	void jwtVerify(token, jwks, { issuer: issuer ?? undefined })
		.then(({ payload }) => {
			if (typeof payload.sub === 'string') {
				(req as Request & { userId?: string }).userId = payload.sub;
			}
			next();
		})
		.catch(() => {
			res.status(401).json({ error: 'No autenticado: token inválido o expirado.' });
		});
}
