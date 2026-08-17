/**
 * OpenRouter provider — second link of the JARVIS chain.
 * OpenAI-compatible chat completions against the provisioned key.
 */
import type { AssistantProvider, AssistantRequest } from '@/domain/ai/ports';
import { buildSystemPrompt } from './prompts';

export interface OpenRouterEnv {
  OPENROUTER_API_KEY?: string;
  OPENROUTER_MODEL?: string;
}

export class OpenRouterProvider implements AssistantProvider {
  readonly name = 'openrouter' as const;

  private readonly apiKey: string;
  private readonly model: string;

  constructor(env: OpenRouterEnv) {
    this.apiKey = env.OPENROUTER_API_KEY ?? '';
    this.model = env.OPENROUTER_MODEL || 'nvidia/nemotron-3-nano-30b-a3b:free';
  }

  get isConfigured(): boolean {
    return this.apiKey.length > 0;
  }

  async ask(request: AssistantRequest): Promise<string> {
    if (!this.isConfigured) throw new Error('OPENROUTER_API_KEY no configurada');

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://esinsa.local',
        'X-Title': 'ESINSA WMS - JARVIS',
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          { role: 'system', content: buildSystemPrompt(request.data, request.lang) },
          { role: 'user', content: request.question },
        ],
        max_tokens: 600,
        temperature: 0.3,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`OpenRouter ${res.status}: ${body.slice(0, 200)}`);
    }

    const json = await res.json();
    const text = json.choices?.[0]?.message?.content?.trim();
    if (!text) throw new Error('OpenRouter devolvió respuesta vacía');
    return text;
  }
}
