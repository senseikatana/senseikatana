export function extractJson(text: string): unknown {
	const cleaned = text.replace(/```(?:json)?/gi, '').trim();

	let start = Infinity;
	for (const char of ['{', '[']) {
		const index = cleaned.indexOf(char);
		if (index !== -1 && index < start) start = index;
	}
	if (start === Infinity) throw new Error('No se encontró JSON en la respuesta.');

	const closing = cleaned[start] === '{' ? '}' : ']';
	const end = cleaned.lastIndexOf(closing);
	if (end === -1 || end < start) throw new Error('JSON mal formado.');

	return JSON.parse(cleaned.slice(start, end + 1));
}
