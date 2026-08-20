/**
 * AI composition root — wires the JARVIS provider chain.
 * Only configured providers are included; the local-rules provider is
 * always present, guaranteeing an answer under any condition.
 */
import type { AssistantProviderName } from '@/domain/ai/ports';
import { AskJarvis } from '@/application/use-cases/ask-jarvis';
import type { GeminiEnv } from './gemini.provider';
import type { OpenRouterEnv } from './openrouter.provider';
import { GeminiProvider } from './gemini.provider';
import { OpenRouterProvider } from './openrouter.provider';
import { LocalRulesProvider } from './local-rules.provider';

type GeminiProviderEnv = GeminiEnv & OpenRouterEnv;

const env = import.meta.env as unknown as GeminiProviderEnv;

const providers = [
  new GeminiProvider(env),
  new OpenRouterProvider(env),
  new LocalRulesProvider(),
].filter((p) => p.isConfigured);

export const askJarvisUseCase = new AskJarvis(providers);

export function activeJarvisProvider(): AssistantProviderName {
  return askJarvisUseCase.activeProvider();
}
