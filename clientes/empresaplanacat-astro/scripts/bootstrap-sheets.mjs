import { createClient } from "@libsql/client";
import { SignJWT } from "jose";
import { createPrivateKey } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { ROOT, loadEnv, buildSpreadsheet } from "./lib/sheets-format.mjs";

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
	scope: "https://www.googleapis.com/auth/spreadsheets",
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

const db = createClient({ url: env.TURSO_DATABASE_URL, authToken: env.TURSO_AUTH_TOKEN });

const linesRes = await db.execute("SELECT id, name, pdf_url FROM lines ORDER BY id");
const schedRes = await db.execute(
	"SELECT line_id, stops_json, departure_time FROM schedules ORDER BY departure_time",
);
const connRes = await db.execute(
	"SELECT from_line_id, at_stop, to_line_id, wait_min FROM line_connections ORDER BY from_line_id, to_line_id",
);

const lines = linesRes.rows.map((r) => ({ id: Number(r.id), name: String(r.name), pdfUrl: String(r.pdf_url) }));
const connections = connRes.rows.map((r) => ({
	fromLineId: Number(r.from_line_id),
	atStop: String(r.at_stop),
	toLineId: Number(r.to_line_id),
	waitMin: Number(r.wait_min),
}));
const schedulesByLine = new Map();
for (const r of schedRes.rows) {
	const lineId = Number(r.line_id);
	const stops = JSON.parse(String(r.stops_json));
	if (!schedulesByLine.has(lineId)) schedulesByLine.set(lineId, []);
	schedulesByLine.get(lineId).push({ departureTime: String(r.departure_time), stops });
}

const out = buildSpreadsheet(lines, schedulesByLine, connections);
const api = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`;

async function sheetsApi(url, options = {}) {
	const res = await fetch(url, {
		...options,
		headers: { Authorization: `Bearer ${accessToken}`, ...(options.headers ?? {}) },
	});
	if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
	return res.json();
}

console.log("1) leyendo pestañas existentes ...");
const info = await sheetsApi(`${api}?fields=sheets.properties(sheetId,title)`);
const existing = new Map(info.sheets.map((s) => [s.properties.title, s.properties.sheetId]));

const desired = Object.keys(out);
console.log(`   hoja tiene ${existing.size} pestaña(s), plantilla necesita ${desired.length}`);

const batch = [];
const DEFAULT_TITLES = ["Hoja 1", "Sheet1", "Feuille 1"];

const firstSheet = info.sheets[0];
if (
	info.sheets.length === 1 &&
	DEFAULT_TITLES.includes(firstSheet?.properties.title) &&
	!existing.has(desired[0])
) {
	batch.push({
		updateSheetProperties: {
			properties: { sheetId: firstSheet.properties.sheetId, title: desired[0] },
			fields: "title",
		},
	});
	existing.delete(firstSheet.properties.title);
	existing.set(desired[0], firstSheet.properties.sheetId);
	console.log(`   renombro "${firstSheet.properties.title}" -> "${desired[0]}"`);
}

for (const title of desired) {
	if (existing.has(title)) continue;
	batch.push({ addSheet: { properties: { title } } });
	console.log(`   añado pestaña "${title}"`);
}

if (batch.length > 0) {
	await sheetsApi(`${api}:batchUpdate`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ requests: batch }),
	});
}

console.log("2) escribiendo valores ...");
for (const [title, rows] of Object.entries(out)) {
	const encoded = encodeURIComponent(title);
	await sheetsApi(`${api}/values/${encoded}:clear`, { method: "POST", body: JSON.stringify({}) });
	if (rows.length === 0) continue;
	const range = `${encoded}!A1:${columnLetter(maxCols(rows))}${rows.length}`;
	await sheetsApi(`${api}/values/${range}?valueInputOption=RAW`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ majorDimension: "ROWS", values: rows.map((r) => r.map((c) => String(c ?? ""))) }),
	});
	const totalCells = rows.reduce((n, r) => n + r.length, 0);
	console.log(`   ${title}: ${rows.length} filas, ${totalCells} celdas`);
}

const leftover = [...existing.keys()].filter((t) => !desired.includes(t));
console.log(`\nListo: ${desired.length} pestañas sincronizadas desde Turso.`);
if (leftover.length > 0) console.log(`AVISO: pestañas extra no tocadas: ${leftover.join(", ")}`);

function maxCols(rows) {
	return Math.max(...rows.map((r) => r.length), 1);
}

function columnLetter(n) {
	let s = "";
	while (n > 0) {
		const rem = (n - 1) % 26;
		s = String.fromCharCode(65 + rem) + s;
		n = Math.floor((n - 1) / 26);
	}
	return s;
}
