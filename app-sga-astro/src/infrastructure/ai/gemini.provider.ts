/**
 * Gemini provider (Google AI Studio) — first link of the JARVIS chain.
 * Retries across a model list when the primary model hits 429 (quota) or
 * 404 (retired); any other HTTP error stops this provider so the chain can
 * fall back.
 */
import type { AssistantProvider, AssistantRequest } from '@/domain/ai/ports';
import { buildSystemPrompt } from './prompts';

export interface GeminiEnv {
  GEMINI_API_KEY?: string;
  GEMINI_MODEL?: string;
  GEMINI_MODEL_FALLBACK?: string;
}

export class GeminiProvider implements AssistantProvider {
  readonly name = 'gemini' as const;

  private readonly apiKey: string;
  private readonly models: string[];

  constructor(env: GeminiEnv) {
    this.apiKey = env.GEMINI_API_KEY ?? '';
    const main = env.GEMINI_MODEL || 'gemini-3-flash-preview';
    const fallback = env.GEMINI_MODEL_FALLBACK || 'gemini-3.1-flash-lite';
    this.models = fallback && fallback !== main ? [main, fallback] : [main];
  }

  get isConfigured(): boolean {
    return this.apiKey.length > 0;
  }

  async ask(request: AssistantRequest): Promise<string> {
    if (!this.isConfigured) throw new Error('GEMINI_API_KEY no configurada');

    let lastError: Error | null = null;

    for (const model of this.models) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.apiKey}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: buildSystemPrompt(request.data, request.lang) }] },
            contents: [{ role: 'user', parts: [{ text: request.question }] }],
            generationConfig: { maxOutputTokens: 1024, temperature: 0.3 },
          }),
        });

        if (!res.ok) {
          const body = await res.text();
          // 404 (modelo retirado) o 429 (cuota agotada) → probar siguiente modelo
          if (res.status === 404 || res.status === 429) {
            lastError = new Error(`Gemini ${model} → ${res.status}`);
            console.warn(`[gemini] ${lastError.message}, probando siguiente modelo…`);
            continue;
          }
          throw new Error(`Gemini ${res.status}: ${body.slice(0, 200)}`);
        }

        const json = await res.json();
        const text = json.candidates?.[0]?.content?.parts
          ?.filter((p: any) => p.text)
          .map((p: any) => p.text)
          .join('')
          .trim();
        if (!text) throw new Error(`Gemini ${model} devolvió respuesta vacía`);
        return text;
      } catch (err) {
        lastError = err as Error;
        // Errores de red → probar siguiente modelo también
        console.warn(`[gemini] Modelo ${model} falló:`, lastError.message);
      }
    }

    throw lastError ?? new Error('Todos los modelos Gemini fallaron');
  }
}
