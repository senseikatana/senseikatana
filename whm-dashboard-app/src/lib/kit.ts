import { getSessionToken } from './supabase';

export interface KittMessage {
	role: 'user' | 'assistant';
	text: string;
}

export interface KittFile {
	id: string;
	name: string;
	rowCount: number;
	columns: string[];
	rows: Record<string, unknown>[];
}

export interface KittHealth {
	configured: boolean;
	provider: 'openrouter' | 'ollama';
	model: string | null;
}

const API_BASE: string = import.meta.env.PUBLIC_API_BASE ?? 'http://localhost:8787';

export async function kittHealth(): Promise<KittHealth | null> {
	try {
		const token = await getSessionToken();
		const headers: Record<string, string> = {};
		if (token) headers.Authorization = `Bearer ${token}`;
		const response = await fetch(`${API_BASE}/api/kitt/health`, {
			headers,
			signal: AbortSignal.timeout(2500),
		});
		if (!response.ok) return null;
		return (await response.json()) as KittHealth;
	} catch {
		return null;
	}
}

export async function* kittStream(
	messages: KittMessage[],
	context: { snapshot: unknown; files: KittFile[] },
): AsyncGenerator<string> {
	const token = await getSessionToken();
	const headers: Record<string, string> = { 'Content-Type': 'application/json' };
	if (token) headers.Authorization = `Bearer ${token}`;
	const response = await fetch(`${API_BASE}/api/kitt/chat`, {
		method: 'POST',
		headers,
		body: JSON.stringify({
			messages,
			snapshot: context.snapshot,
			files: context.files.map((file) => ({
				name: file.name,
				rowCount: file.rowCount,
				rows: file.rows,
			})),
		}),
	});

	if (!response.ok || !response.body) {
		const data = (await response.json().catch(() => ({}))) as { error?: string };
		throw new Error(data.error ?? 'El copiloto no respondió.');
	}

	const reader = response.body.getReader();
	const decoder = new TextDecoder();
	let buffer = '';

	for (;;) {
		const { done, value } = await reader.read();
		if (done) break;
		buffer += decoder.decode(value, { stream: true });

		let separator = buffer.indexOf('\n\n');
		while (separator !== -1) {
			const raw = buffer.slice(0, separator);
			buffer = buffer.slice(separator + 2);
			separator = buffer.indexOf('\n\n');

			const event = raw
				.split('\n')
				.find((line) => line.startsWith('event: '))
				?.slice(7);
			const dataLine = raw
				.split('\n')
				.find((line) => line.startsWith('data: '))
				?.slice(6);
			if (!dataLine) continue;

			if (event === 'delta') {
				const parsed = JSON.parse(dataLine) as { text?: string };
				if (parsed.text) yield parsed.text;
			} else if (event === 'error') {
				const parsed = JSON.parse(dataLine) as { message?: string };
				throw new Error(parsed.message ?? 'El copiloto no respondió.');
			} else if (event === 'done') {
				return;
			}
		}
	}
}
