import { createClient } from "@libsql/client";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { hashPasskey } from "../src/lib/passkey.ts";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

function loadEnv() {
	const env = {};
	const raw = readFileSync(path.join(ROOT, ".env"), "utf8");
	for (const line of raw.split("\n")) {
		const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
		if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
	}
	return env;
}

const env = loadEnv();
const db = createClient({ url: env.TURSO_DATABASE_URL, authToken: env.TURSO_AUTH_TOKEN });

const demoUsers = [
	{ name: "Admin", fullName: "Administrador Empresa Plana", phone: "+34 977 553 680", email: "admin@empresaplana.cat", passkey: "ADMIN1234", username: "admin", role: "admin" },
	{ name: "Worker", fullName: "Personal de Conducción", phone: "+34 600 000 001", email: "worker@empresaplana.cat", passkey: "WORKER12", username: "worker", role: "worker" },
	{ name: "Client", fullName: "Cliente Demo", phone: "+34 600 000 002", email: "client@empresaplana.cat", passkey: "CLIENT01", username: "client", role: "client" },
];

for (const user of demoUsers) {
	const passkeyHash = hashPasskey(user.passkey);
	await db.execute({
		sql: `INSERT INTO usuarios (name, full_name, phone, email, passkey_hash, username, role)
		      VALUES (?, ?, ?, ?, ?, ?, ?)
		      ON CONFLICT(username) DO UPDATE SET
		        name = excluded.name,
		        full_name = excluded.full_name,
		        phone = excluded.phone,
		        email = excluded.email,
		        passkey_hash = excluded.passkey_hash,
		        role = excluded.role`,
		args: [user.name, user.fullName, user.phone, user.email, passkeyHash, user.username, user.role],
	});
	console.log(`upsert: ${user.username} (${user.role})`);
}

const rows = await db.execute("SELECT id, username, role, email, substr(passkey_hash, 1, 12) AS hash_prefix FROM usuarios ORDER BY id");
console.table(rows.rows);
