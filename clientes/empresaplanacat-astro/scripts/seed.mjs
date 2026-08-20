import { createClient } from "@libsql/client";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const BASE = "https://empresaplana.cat";

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

function decodeEntities(text) {
	return text
		.replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
		.replace(/&quot;/g, '"')
		.replace(/&apos;/g, "'")
		.replace(/&amp;/g, "&")
		.replace(/&iacute;/g, "í")
		.replace(/&oacute;/g, "ó")
		.replace(/&eacute;/g, "é")
		.replace(/&aacute;/g, "á")
		.replace(/&uacute;/g, "ú")
		.replace(/&agrave;/g, "à")
		.replace(/&egrave;/g, "è")
		.replace(/&ccedil;/g, "ç")
		.replace(/&ntilde;/g, "ñ")
		.replace(/&uuml;/g, "ü")
		.replace(/&ordm;/g, "º")
		.replace(/&laquo;/g, "«")
		.replace(/&raquo;/g, "»")
		.replace(/&nbsp;/g, " ")
		.trim();
}

function field(text, label) {
	const m = text.match(new RegExp(`<small>${label}</small>.*?<p[^>]*>\\s*([^<]+?)\\s*</p>`, "s"));
	return m ? decodeEntities(m[1]) : "";
}

async function fetchHtml(url, options) {
	const resp = await fetch(url, options);
	if (!resp.ok) throw new Error(`HTTP ${resp.status} en ${url}`);
	return resp.text();
}

// 1) Página de descargas: 8 boxes de líneas + mapa de ids del select de origen
console.log("1) GET /descargas ...");
const descargasHtml = await fetchHtml(`${BASE}/descargas`);

const boxes = descargasHtml.split('<div class="searchest-lines__box">').slice(1).map((b) => {
	const name = b.match(/searchest-lines__line">([^<]+)/);
	const origin = b.match(/searchest-lines__title">([^<]+)/);
	const destChain = b.match(/searchest-lines__text">([^<]+)/);
	const pdf = b.match(/href="([^"]+\.pdf)"/);
	return {
		name: name ? decodeEntities(name[1]) : null,
		origin: origin ? decodeEntities(origin[1]) : null,
		destChain: destChain ? decodeEntities(destChain[1]) : null,
		pdf: pdf ? pdf[1] : null,
	};
}).filter((b) => b.name && b.origin && b.destChain);

console.log(`   líneas detectadas: ${boxes.length}`);
for (const b of boxes) console.log(`   - ${b.name} | ${b.origin} -> ${b.destChain}`);

const origenSelect = descargasHtml.match(/<select[^>]*id="origenSelect".*?<\/select>/s);
if (!origenSelect) throw new Error("No se encontró el select de origen en /descargas");
const normalize = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const idMap = new Map();
for (const m of origenSelect[0].matchAll(/<option value="(\d+)"[^>]*>\s*(.*?)\s*<\/option>/gs)) {
	idMap.set(normalize(decodeEntities(m[2])), Number(m[1]));
}

const FECHAS = ["15/08/2026", "15/09/2026", "15/11/2026"];

function pdfName(pdfUrl) {
	const base = decodeURIComponent(pdfUrl.split("/").pop().replace(/\.pdf$/i, ""));
	return base
		.replace(/\u00c2\u00b7/g, "\u00b7")
		.replace(/^Horari\s+/i, "")
		.replace(/\s+20\d\d(-\d{2,4})?$/, "")
		.replace(/\s+/g, " ")
		.trim();
}

// 2) Por cada box: POST del buscador real (origen -> destino) y parseo de salidas
const lines = new Map();   // lineId -> { name, pdf }
const schedules = [];      // { lineId, originTown, destTown, dep, arr, dur, stops: [] }

for (const box of boxes) {
	const dest = box.destChain.split("-").pop().trim();
	const originId = idMap.get(normalize(box.origin));
	const destId = idMap.get(normalize(dest));
	if (!originId || !destId) {
		console.log(`   [skip] ${box.name}: sin id para ${box.origin}(${originId}) o ${dest}(${destId})`);
		continue;
	}
	console.log(`   POST ${box.name}: ${box.origin}(${originId}) <-> ${dest}(${destId})`);
	for (const direction of [
		{ fromId: originId, toId: destId, label: `${box.origin} -> ${dest}` },
		{ fromId: destId, toId: originId, label: `${dest} -> ${box.origin}` },
	]) {
		let html = null;
		let bestCount = -1;
		for (const fecha of FECHAS) {
			const body = new URLSearchParams({
				origen: String(direction.fromId),
				destino: String(direction.toId),
				fecha,
				horario: "",
				search_type: "0",
			});
			const candidate = await fetchHtml(`${BASE}/descargas`, {
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body,
			});
			const count = (candidate.match(/<div class="row" id="/g) ?? []).length;
			if (count > bestCount) {
				bestCount = count;
				html = candidate;
			}
		}

		let rows = 0;
		for (const chunk of html.split('<div class="row" id="').slice(1)) {
		const lineId = Number(chunk.match(/^(\d+)/)?.[1]);
		if (!lineId) continue;

		const origen = chunk.match(/id="ruta-origen"[^>]*>([^<]+)/);
		const destino = chunk.match(/id="ruta-destino"[^>]*>([^<]+)/);
		const salida = chunk.match(/id="ruta-salida"[^>]*>([^<]+)/);
		const llegada = chunk.match(/id="ruta-llegada"[^>]*>([^<]+)/);
		const duracion = chunk.match(/id="ruta-duracion"[^>]*>([^<]+)/);
		if (!origen || !destino || !salida || !llegada) continue;

		const originTown = decodeEntities(origen[1]).split("(")[0].trim();
		const destTown = decodeEntities(destino[1]).split("(")[0].trim();

		const stops = [];
		for (const piece of chunk.split("well-info custom-row").slice(1)) {
			const town = field(piece, "Población");
			const name = field(piece, "Parada");
			const hora = field(piece, "Hora");
			if (!town || !name || !hora) continue;
			const latlon = piece.match(/data-latitud="([\d.]+)" data-longitud="([\d.]+)"/);
			stops.push({
				town,
				name,
				time: hora,
				lat: latlon ? Number(latlon[1]) : null,
				lon: latlon ? Number(latlon[2]) : null,
			});
		}
		if (stops.length === 0) continue;

		if (!lines.has(lineId)) lines.set(lineId, { name: box.name, pdf: box.pdf });
		schedules.push({
			lineId,
			originTown,
			destTown,
			dep: decodeEntities(salida[1]).trim(),
			arr: decodeEntities(llegada[1]).trim(),
			dur: decodeEntities(duracion[1]).trim(),
			stops,
		});
		rows++;
	}
	console.log(`     [${direction.label}] salidas capturadas: ${rows}`);
}
}

console.log(`\n2) líneas únicas: ${lines.size}, salidas totales: ${schedules.length}`);

// 3) Resolver el PDF real de cada línea vía el redirect de descargas-pdf-linea/{id}
for (const [lineId, line] of lines) {
	try {
		const resp = await fetch(`${BASE}/descargas-pdf-linea/${lineId}`, { redirect: "manual" });
		const loc = resp.headers.get("location");
		if (loc && loc.endsWith(".pdf")) {
			line.pdf = loc;
			line.name = pdfName(loc) || line.name;
		}
	} catch (e) {
		console.warn(`   [pdf] no se pudo resolver para la línea ${lineId}: ${e.message}`);
	}
}

const seen = new Set();
const uniqueSchedules = schedules.filter((s) => {
	const key = `${s.lineId}|${s.originTown}|${s.dep}`;
	if (seen.has(key)) return false;
	seen.add(key);
	return true;
});
console.log(`   tras dedupe: ${uniqueSchedules.length} salidas`);

// 4) Escribir en Turso
console.log("3) aplicando schema ...");
await db.executeMultiple(readFileSync(path.join(ROOT, "db", "schema.sql"), "utf8"));
await db.execute("DELETE FROM line_connections");
await db.execute("DELETE FROM schedules");
await db.execute("DELETE FROM lines");

const lineStmts = [...lines.entries()].map(([id, l]) => ({
	sql: "INSERT INTO lines (id, name, pdf_url) VALUES (?, ?, ?)",
	args: [id, l.name, l.pdf],
}));
await db.batch(lineStmts, "write");
console.log(`   ${lines.size} líneas insertadas`);

for (let i = 0; i < uniqueSchedules.length; i += 25) {
	const chunk = uniqueSchedules.slice(i, i + 25).map((s) => ({
		sql: "INSERT INTO schedules (line_id, origin_town, destination_town, departure_time, arrival_time, duration, stops_json) VALUES (?, ?, ?, ?, ?, ?, ?)",
		args: [s.lineId, s.originTown, s.destTown, s.dep, s.arr, s.dur, JSON.stringify(s.stops)],
	}));
	await db.batch(chunk, "write");
}
console.log(`   ${uniqueSchedules.length} salidas insertadas`);

// 5) Verificación
const counts = await db.execute("SELECT (SELECT count(*) FROM lines) AS l, (SELECT count(*) FROM schedules) AS s");
console.log("4) verificación:", counts.rows[0]);

for (const [id, l] of lines) console.log(`   línea ${id}: ${l.name} -> ${l.pdf}`);
