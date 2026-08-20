import { createClient } from "@libsql/client";
import { SignJWT } from "jose";
import { createPrivateKey } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { ROOT, loadEnv, parseSpreadsheet } from "./lib/sheets-format.mjs";

const env = loadEnv();
const credPath = env.GOOGLE_SERVICE_ACCOUNT_JSON;
const spreadsheetId = env.GOOGLE_SPREADSHEET_ID;

if (!credPath || !spreadsheetId) {
	console.error("Faltan GOOGLE_SERVICE_ACCOUNT_JSON y/o GOOGLE_SPREADSHEET_ID en .env");
	process.exit(1);
}

const creds = JSON.parse(readFileSync(path.join(ROOT, credPath), "utf8"));
const now = Math.floor(Date.now() / 1000);

const jwt = await new SignJWT({
	scope: "https://www.googleapis.com/auth/spreadsheets.readonly",
	aud: "https://oauth2.googleapis.com/token",
	iat: now,
	exp: now + 3600,
	iss: creds.client_email,
})
	.setProtectedHeader({ alg: "RS256", typ: "JWT" })
	.sign(createPrivateKey(creds.private_key));

const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
	method: "POST",
	headers: { "Content-Type": "application/x-www-form-urlencoded" },
	body: new URLSearchParams({
		grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
		assertion: jwt,
	}),
});
const tokenJson = await tokenRes.json();
if (!tokenJson.access_token) {
	console.error("Error obteniendo access token:", JSON.stringify(tokenJson).slice(0, 400));
	process.exit(1);
}
const accessToken = tokenJson.access_token;

async function sheetJson(url) {
	const res = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
	if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
	return res.json();
}

const api = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`;

console.log("1) leyendo spreadsheet ...");
const info = await sheetJson(`${api}?fields=sheets.properties.title`);
const tabs = [];
for (const sheet of info.sheets) {
	const title = sheet.properties.title;
	const data = await sheetJson(`${api}/values/${encodeURIComponent(title)}`);
	tabs.push({ title, values: data.values ?? [] });
	console.log(`   tab "${title}" (${(data.values ?? []).length} filas)`);
}

const { lines, schedules, connections } = parseSpreadsheet(tabs);
console.log(`2) parseadas ${lines.size} líneas, ${schedules.length} salidas, ${connections.length} conexiones`);

const db = createClient({ url: env.TURSO_DATABASE_URL, authToken: env.TURSO_AUTH_TOKEN });

console.log("3) aplicando schema y limpiando ...");
await db.executeMultiple(readFileSync(path.join(ROOT, "db", "schema.sql"), "utf8"));
await db.execute("DELETE FROM line_connections");
await db.execute("DELETE FROM schedules");
await db.execute("DELETE FROM lines");

const lineStmts = [...lines.entries()].map(([id, l]) => ({
	sql: "INSERT INTO lines (id, name, pdf_url) VALUES (?, ?, ?)",
	args: [id, l.name, l.pdfUrl],
}));
await db.batch(lineStmts, "write");
console.log(`   ${lines.size} líneas insertadas`);

for (let i = 0; i < schedules.length; i += 25) {
	const chunk = schedules.slice(i, i + 25).map((s) => ({
		sql: "INSERT INTO schedules (line_id, origin_town, destination_town, departure_time, arrival_time, duration, stops_json) VALUES (?, ?, ?, ?, ?, ?, ?)",
		args: [s.lineId, s.originTown, s.destinationTown, s.departureTime, s.arrivalTime, s.duration, JSON.stringify(s.stops)],
	}));
	await db.batch(chunk, "write");
}
console.log(`   ${schedules.length} salidas insertadas`);

if (connections.length > 0) {
	const connChunks = [];
	for (let i = 0; i < connections.length; i += 25) {
		connChunks.push(
			connections.slice(i, i + 25).map((c) => ({
				sql: "INSERT INTO line_connections (from_line_id, at_stop, to_line_id, wait_min) VALUES (?, ?, ?, ?)",
				args: [c.fromLineId, c.atStop, c.toLineId, c.waitMin],
			})),
		);
	}
	for (const chunk of connChunks) await db.batch(chunk, "write");
	console.log(`   ${connections.length} conexiones insertadas`);
}

const counts = await db.execute(
	"SELECT (SELECT count(*) FROM lines) AS l, (SELECT count(*) FROM schedules) AS s, (SELECT count(*) FROM line_connections) AS c",
);
console.log("4) verificación:", counts.rows[0]);
