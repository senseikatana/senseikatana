import * as XLSX from 'xlsx';

export interface SpreadsheetData {
	name: string;
	size: number;
	columns: string[];
	rows: Record<string, unknown>[];
	rowCount: number;
}

const NUT_PATTERNS = [/nut/i, /cod/i, /sku/i, /^id$/i, /n.mero/i];
const NAME_PATTERNS = [/producto/i, /product/i, /art.culo/i, /nombre/i, /descrip/i, /referencia/i];

function detectColumn(columns: string[], patterns: RegExp[]): string | null {
	for (const pattern of patterns) {
		const match = columns.find((column) => pattern.test(column));
		if (match) return match;
	}
	return null;
}

function normalizeRow(
	row: Record<string, unknown>,
	nutKey: string | null,
	nameKey: string | null,
): Record<string, unknown> {
	const out: Record<string, unknown> = { ...row };
	if (nutKey) out.nut = row[nutKey];
	if (nameKey) out.producto = row[nameKey];
	return out;
}

export async function parseSpreadsheet(file: File): Promise<SpreadsheetData> {
	const buffer = await file.arrayBuffer();
	const workbook = XLSX.read(buffer, { type: 'array' });
	const sheetName = workbook.SheetNames[0];
	if (!sheetName) throw new Error('Sin hojas');
	const sheet = workbook.Sheets[sheetName];
	const raw = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: '' });
	const columns = raw.length > 0 ? Object.keys(raw[0]) : [];
	const nutKey = detectColumn(columns, NUT_PATTERNS);
	const nameKey = detectColumn(columns, NAME_PATTERNS);
	const rows = raw.map((row) => normalizeRow(row, nutKey, nameKey));

	return {
		name: file.name,
		size: file.size,
		columns,
		rows,
		rowCount: rows.length,
	};
}
