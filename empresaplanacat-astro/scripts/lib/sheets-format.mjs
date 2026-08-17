import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

export const ROOT = path.dirname(path.dirname(path.dirname(fileURLToPath(import.meta.url))));
export const LINEAS_TAB = "LÍNEAS";
export const CONEXIONES_TAB = "CONEXIONES";

export function loadEnv() {
	const env = {};
	const raw = readFileSync(path.join(ROOT, ".env"), "utf8");
	for (const line of raw.split("\n")) {
		const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
		if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
	}
	return env;
}

export function normalize(text) {
	return String(text ?? "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function normalizeTime(value) {
	const raw = String(value ?? "").trim();
	const m = raw.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
	if (!m) return raw;
	return `${m[1].padStart(2, "0")}:${m[2]}`;
}

export function computeDuration(dep, arr) {
	const toMin = (t) => {
		const m = String(t ?? "").match(/^(\d{2}):(\d{2})$/);
		return m ? Number(m[1]) * 60 + Number(m[2]) : null;
	};
	const a = toMin(dep);
	const b = toMin(arr);
	if (a == null || b == null) return "55m";
	const diff = (b - a + 1440) % 1440;
	const h = Math.floor(diff / 60);
	const min = diff % 60;
	if (h === 0) return `${min}m`;
	if (min === 0) return `${h}h`;
	return `${h}h ${min}m`;
}

export function parseStopLabel(label) {
	const raw = String(label ?? "").trim();
	if (!raw) return null;
	const idx = raw.lastIndexOf(" — ");
	if (idx !== -1) {
		return { town: raw.slice(0, idx).trim(), name: raw.slice(idx + 3).trim() };
	}
	return { town: raw, name: raw };
}

export function stopKey(town, name) {
	return `${normalize(town)}|${normalize(name)}`;
}

/**
 * Parsea un spreadsheet (lista de { title, values }) en el formato plantilla:
 * - Tab "LÍNEAS": columnas id | nombre | pdf_url (fila 1 = header).
 * - Tab "CONEXIONES": columnas desde_linea | parada | hasta_linea | espera_min.
 * - Un tab por línea: tab = "{id} - {nombre}". Fila 1 = paradas
 *   "{Población} — {Parada}"; cada fila siguiente = una salida con su hora.
 */
export function parseSpreadsheet(tabs) {
	const metadata = new Map();
	const tabTitleById = new Map();
	const lines = new Map();
	const schedules = [];
	const connections = [];

	for (const tab of tabs) {
		const title = String(tab.title ?? "").trim();
		const rows = (tab.values ?? []).filter((row) => row.some((c) => String(c ?? "").trim() !== ""));

		if (normalize(title) === normalize(LINEAS_TAB)) {
			for (const row of rows.slice(1)) {
				const id = Number(String(row[0] ?? "").trim());
				if (!id) continue;
				metadata.set(id, {
					name: String(row[1] ?? "").trim(),
					pdfUrl: String(row[2] ?? "").trim(),
				});
			}
			continue;
		}

		if (normalize(title) === normalize(CONEXIONES_TAB)) {
			for (const row of rows.slice(1)) {
				const fromLineId = Number(String(row[0] ?? "").trim());
				const atStop = String(row[1] ?? "").trim();
				const toLineId = Number(String(row[2] ?? "").trim());
				if (!fromLineId || !atStop || !toLineId) continue;
				const waitMin = Math.max(0, Number(String(row[3] ?? "").trim()) || 0);
				connections.push({ fromLineId, atStop, toLineId, waitMin });
			}
			continue;
		}

		const idMatch = title.match(/^(\d+)\s*[-–—]/);
		if (!idMatch || rows.length < 2) continue;
		const lineId = Number(idMatch[1]);
		tabTitleById.set(lineId, title);

		const header = rows[0].map((c) => parseStopLabel(c)).filter(Boolean);
		if (header.length === 0) continue;

		for (const row of rows.slice(1)) {
			const times = row.map((c) => String(c ?? "").trim());
			const present = [];
			for (let i = 0; i < header.length; i++) {
				const time = normalizeTime(times[i] ?? "");
				if (time === "") continue;
				present.push({ town: header[i].town, name: header[i].name, time });
			}
			if (present.length === 0) continue;

			const first = present[0];
			const last = present[present.length - 1];
			schedules.push({
				lineId,
				originTown: first.town,
				destinationTown: last.town,
				departureTime: first.time,
				arrivalTime: last.time,
				duration: computeDuration(first.time, last.time),
				stops: present,
			});
		}
	}

	const allIds = new Set([...metadata.keys(), ...schedules.map((s) => s.lineId)]);
	for (const lineId of allIds) {
		const meta = metadata.get(lineId);
		const tabName = tabTitleById.has(lineId) ? String(tabTitleById.get(lineId)).replace(/^\d+\s*[-–—]\s*/, "") : "";
		lines.set(lineId, { name: meta?.name || tabName || `Línea ${lineId}`, pdfUrl: meta?.pdfUrl ?? "" });
	}

	return { lines, schedules, connections };
}

export function toCsv(rows) {
	return rows
		.map((row) =>
			row
				.map((cell) => {
					const s = String(cell ?? "");
					return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
				})
				.join(","),
		)
		.join("\n");
}

function pickHeaderStops(scheds) {
	if (scheds.length === 0) return [];
	let best = scheds[0];
	for (const s of scheds) if (s.stops.length > best.stops.length) best = s;
	return best.stops;
}

/** Vuelca la DB al formato plantilla: objeto { tabName -> filas }. */
export function buildSpreadsheet(lineRows, schedulesByLine, connections = []) {
	const out = {
		[LINEAS_TAB]: [["id", "nombre", "pdf_url"], ...lineRows.map((l) => [l.id, l.name, l.pdfUrl ?? ""])],
		[CONEXIONES_TAB]: [
			["desde_linea", "parada", "hasta_linea", "espera_min"],
			...connections.map((c) => [c.fromLineId, c.atStop, c.toLineId, c.waitMin]),
		],
	};

	for (const line of lineRows) {
		const scheds = schedulesByLine.get(line.id) ?? [];
		const header = pickHeaderStops(scheds);
		if (header.length === 0 || scheds.length === 0) continue;

		const keyToIndex = new Map(header.map((s, i) => [stopKey(s.town, s.name), i]));
		const rows = [[...header.map((s) => `${s.town} — ${s.name}`)]];

		const sorted = [...scheds].sort((a, b) => (a.departureTime < b.departureTime ? -1 : 1));
		for (const s of sorted) {
			const row = Array(header.length).fill("");
			for (const stop of s.stops) {
				const idx = keyToIndex.get(stopKey(stop.town, stop.name));
				if (idx != null) row[idx] = stop.time;
			}
			if (row.some((c) => c !== "")) rows.push(row);
		}
		if (rows.length > 1) out[`${line.id} - ${line.name}`] = rows;
	}

	return out;
}
