import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

export function hashPasskey(passkey: string): string {
	const salt = randomBytes(16).toString("hex");
	const hash = scryptSync(passkey, salt, 32).toString("hex");
	return `${salt}:${hash}`;
}

export function verifyPasskey(passkey: string, stored: string): boolean {
	const [salt, hash] = stored.split(":");
	if (!salt || !hash) return false;
	const candidate = scryptSync(passkey, salt, 32);
	const expected = Buffer.from(hash, "hex");
	return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}
