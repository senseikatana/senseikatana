import type { Response as ExpressResponse } from 'express';

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OLLAMA_URL = 'http://localhost:11434/v1/chat/completions';

export type KittProvider = 'openrouter' | 'ollama';

interface KittMessage {
	role: 'user' | 'assistant';
	text: string;
}

interface KittFilePayload {
	name: string;
	rowCount: number;
	rows: Record<string, unknown>[];
}

interface KittChatBody {
	messages?: KittMessage[];
	snapshot?: unknown;
	files?: KittFilePayload[];
}

export function kittProvider(): KittProvider {
	const configured = process.env.KITT_PROVIDER?.toLowerCase();
	if (configured === 'ollama') return 'ollama';
	if (configured === 'openrouter') return 'openrouter';
	return process.env.OPENROUTER_API_KEY ? 'openrouter' : 'ollama';
}

export function kittConfigured(): boolean {
	return kittProvider() === 'ollama' || Boolean(process.env.OPENROUTER_API_KEY);
}

export function kittModel(): string {
	if (kittProvider() === 'ollama') {
		return process.env.OLLAMA_MODEL ?? 'llama3.2';
	}
	return process.env.KITT_MODEL ?? 'google/gemini-2.5-flash';
}

const BASE_PROMPT = `Sos KITT, el copiloto logístico del sistema WarehouseFlow.
Respondé en español (rioplatense, cordial y directo) y con datos puntuales.
Podés analizar el estado del almacén (que se te pasa como JSON) y los maestros de
productos cargados con códigos NUT. Si te preguntan por stock, faltantes, pedidos,
rutas o clientes, usá los datos del contexto; si no alcanzan, decilo con claridad.`;

function buildSystemMessage(body: KittChatBody): string {
	let prompt = BASE_PROMPT;
	if (body.snapshot !== undefined) {
		prompt += `\n\n## ESTADO ACTUAL DEL ALMACÉN\n${JSON.stringify(body.snapshot)}`;
	}
	if (body.files !== undefined && body.files.length > 0) {
		const files = body.files
			.map(
				(file) =>
					`### ${file.name} (${file.rowCount} filas)\n${JSON.stringify(file.rows)}`,
			)
			.join('\n\n');
		prompt += `\n\n## MAESTROS DE PRODUCTOS CARGADOS (códigos NUT)\n${files}`;
	}
	return prompt;
}

export async function kittChat(res: ExpressResponse, body: KittChatBody): Promise<void> {
	const provider = kittProvider();

	if (!kittConfigured()) {
		res.status(400).json({ error: 'No hay proveedor de IA configurado (OpenRouter u Ollama).' });
		return;
	}

	const messages = (body.messages ?? [])
		.filter((message) => message.role === 'user' || message.role === 'assistant')
		.map((message) => ({ role: message.role, content: message.text }));

	if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
		res.status(400).json({ error: 'No hay una consulta para procesar.' });
		return;
	}

	const payload = {
		model: kittModel(),
		stream: true,
		messages: [{ role: 'system', content: buildSystemMessage(body) }, ...messages],
	};

	const headers: Record<string, string> = { 'Content-Type': 'application/json' };
	if (provider === 'openrouter') {
		headers.Authorization = `Bearer ${process.env.OPENROUTER_API_KEY}`;
	}

	let upstream: Response;
	try {
		upstream = await fetch(
			provider === 'ollama' ? OLLAMA_URL : OPENROUTER_URL,
			{ method: 'POST', headers, body: JSON.stringify(payload) },
		);
	} catch (error) {
		console.error('[kitt] no se pudo contactar al proveedor:', error);
		res.status(502).json({
			error:
				provider === 'ollama'
					? 'Ollama no responde. Asegurate de que esté corriendo (ollama serve).'
					: 'No se pudo contactar a OpenRouter.',
		});
		return;
	}

	if (!upstream.ok || !upstream.body) {
		const detail = await upstream.text().catch(() => '');
		console.error(`[kitt] proveedor ${provider} respondió ${upstream.status}:`, detail);
		res.status(502).json({ error: `El proveedor de IA respondió ${upstream.status}.` });
		return;
	}

	res.setHeader('Content-Type', 'text/event-stream');
	res.setHeader('Cache-Control', 'no-cache');
	res.setHeader('Connection', 'keep-alive');
	res.flushHeaders?.();

	const reader = upstream.body.getReader();
	const decoder = new TextDecoder();
	let buffer = '';

	try {
		for (;;) {
			const { done, value } = await reader.read();
			if (done) break;
			buffer += decoder.decode(value, { stream: true });

			const lines = buffer.split('\n');
			buffer = lines.pop() ?? '';

			for (const line of lines) {
				const trimmed = line.trim();
				if (!trimmed.startsWith('data:')) continue;
				const data = trimmed.slice(5).trim();
				if (data === '[DONE]') continue;

				try {
					const parsed = JSON.parse(data) as {
						choices?: Array<{ delta?: { content?: string } }>;
					};
					const delta = parsed.choices?.[0]?.delta?.content;
					if (typeof delta === 'string' && delta.length > 0) {
						res.write(`event: delta\ndata: ${JSON.stringify({ text: delta })}\n\n`);
					}
				} catch {
					// Chunk malformado del proveedor: se ignora.
				}
			}
		}
	} catch (error) {
		console.error('[kitt] error leyendo el stream del proveedor:', error);
	} finally {
		res.write('event: done\ndata: {}\n\n');
		res.end();
	}
}
