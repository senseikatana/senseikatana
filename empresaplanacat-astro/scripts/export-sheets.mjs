import { createClient } from "@libsql/client";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { ROOT, buildSpreadsheet, loadEnv, toCsv } from "./lib/sheets-format.mjs";

const env = loadEnv();
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
const outDir = path.join(ROOT, "sheets-export");
mkdirSync(outDir, { recursive: true });

for (const [tab, rows] of Object.entries(out)) {
	const file = path.join(outDir, `${tab.replace(/[/\\]/g, "-")}.csv`);
	writeFileSync(file, toCsv(rows));
	console.log(`   ${file}`);
}
console.log(`\n${Object.keys(out).length} archivos exportados a sheets-export/`);
