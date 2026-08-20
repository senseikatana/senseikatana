const AI_ENDPOINT = import.meta.env.PUBLIC_AI_ENDPOINT;

interface AiResponse {
	text?: unknown;
	content?: unknown;
	choices?: Array<{ message?: { content?: unknown } }>;
}

export const ai = {
	isConfigured(): boolean {
		return Boolean(AI_ENDPOINT);
	},
	async generate(prompt: string): Promise<string> {
		if (!AI_ENDPOINT) throw new Error('AI_NOT_CONFIGURED');

		const response = await fetch(AI_ENDPOINT, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ prompt }),
		});
		if (!response.ok) {
			throw new Error(`Error del asistente de IA (${response.status}).`);
		}

		const data = (await response.json()) as AiResponse;
		const text =
			typeof data.text === 'string'
				? data.text
				: typeof data.content === 'string'
					? data.content
					: data.choices?.[0]?.message?.content;

		if (typeof text !== 'string' || text.length === 0) {
			throw new Error('El asistente de IA no devolvió una respuesta válida.');
		}
		return text;
	},
};
