/**
 * Office adapter (client-side) — Excel import/export via SheetJS.
 * Isolates the XLSX dependency so pages never touch window.XLSX or CDNs.
 */
import * as XLSX from 'xlsx';

export function exportRowsToExcel(
  filename: string,
  sheetName: string,
  rows: Record<string, unknown>[]
): void {
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, filename);
}

export function readExcelFile(file: File): Promise<Record<string, any>[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = evt.target?.result;
        if (data == null) throw new Error('Archivo vacío');
        const workbook = XLSX.read(data as string, { type: 'binary' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        resolve(XLSX.utils.sheet_to_json<Record<string, any>>(sheet));
      } catch (err) {
        reject(err instanceof Error ? err : new Error('Error leyendo el archivo'));
      }
    };
    reader.onerror = () => reject(new Error('Error leyendo el archivo'));
    reader.readAsBinaryString(file);
  });
}
