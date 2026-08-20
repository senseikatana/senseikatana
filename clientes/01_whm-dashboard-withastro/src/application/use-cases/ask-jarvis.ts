/**
 * AskJarvis — application use-case.
 * Orchestrates the provider chain (first one that answers wins) and
 * surfaces which provider produced the reply. The chain always ends with
 * the local-rules provider, so JARVIS never fails to answer.
 */
import type {
  AssistantProvider,
  AssistantProviderName,
  AssistantRequest,
} from '@/domain/ai/ports';

export interface JarvisAnswer {
  reply: string;
  source: AssistantProviderName;
}

export class AskJarvis {
  constructor(private readonly providers: AssistantProvider[]) {}

  async ask(request: AssistantRequest): Promise<JarvisAnswer> {
    let lastError: Error | null = null;

    for (const provider of this.providers) {
      try {
        const reply = await provider.ask(request);
        return { reply, source: provider.name };
      } catch (err) {
        lastError = err as Error;
        console.warn(`[ask-jarvis] Proveedor ${provider.name} falló:`, lastError.message);
      }
    }

    throw lastError ?? new Error('Sin proveedores de IA configurados');
  }

  activeProvider(): AssistantProviderName {
    return this.providers[0]?.name ?? 'local';
  }
}
