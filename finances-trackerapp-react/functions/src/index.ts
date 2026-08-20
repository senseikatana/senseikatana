import * as logger from 'firebase-functions/logger';
import { onRequest } from 'firebase-functions/v2/https';

const NVIDIA_API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const PRIMARY_MODEL = process.env.PRIMARY_MODEL || 'zai-org/glm-5.2';
const FALLBACK_MODEL = process.env.FALLBACK_MODEL || 'deepseek-ai/deepseek-v4-pro';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

function getSystemPrompt(financialSummary: string): string {
  return `Eres un asistente financiero experto en español. Ayudas al usuario a entender y mejorar sus finanzas personales.

CONTEXTO FINANCIERO ACTUAL DEL USUARIO:
${financialSummary}

INSTRUCCIONES:
- Responde SIEMPRE en español.
- Sé conciso, práctico y empático.
- Usa formato markdown para estructurar respuestas (listas, tablas, negritas).
- Si el usuario pide análisis, usa los datos del contexto.
- Si no tienes datos suficientes, pregunta amablemente qué necesita.
- NUNCA inventes datos; di "no tengo ese dato" si falta información.
- Acciones rápidas sugeridas: "Analizar gastos", "Revisar presupuesto", "Optimizar suscripciones", "Plan de ahorro", "Reducir deudas".`;
}

async function callNVIDIA(messages: ChatMessage[], model: string, apiKey: string, onChunk: (chunk: string) => void): Promise<void> {
  const response = await fetch(NVIDIA_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      stream: true,
      temperature: 0.3,
      max_tokens: 2048,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`NVIDIA API error (${model}): ${response.status} ${errText}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error('No response body');

  const decoder = new TextDecoder();
  let buffer = '';

  let done = false;
  while (!done) {
    const result = await reader.read();
    done = result.done;
    const value = result.value;
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6).trim();
        if (data === '[DONE]') return;
        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) onChunk(content);
        } catch {
          // ignore parse errors on incomplete chunks
        }
      }
    }
  }
}

export const assistantChat = onRequest(
  {
    region: 'europe-west1',
    secrets: ['NVIDIA_API_KEY'],
    maxInstances: 10,
  },
  async (req, res) => {
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.status(204).send('');
      return;
    }

    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');

    const { messages, financialSummary } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: 'messages array required' });
      return;
    }

    const apiKey = process.env.NVIDIA_API_KEY;
    if (!apiKey) {
      logger.error('NVIDIA_API_KEY not configured');
      res.status(500).json({ error: 'AI service not configured' });
      return;
    }

    const systemPrompt = getSystemPrompt(financialSummary || 'Sin datos financieros disponibles.');
    const fullMessages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      ...messages,
    ];

    let usedFallback = false;
    let streamError = false;

    res.write(`event: metadata\ndata: ${JSON.stringify({ model: PRIMARY_MODEL })}\n\n`);

    try {
      await callNVIDIA(fullMessages, PRIMARY_MODEL, apiKey, (chunk) => {
        res.write(`event: chunk\ndata: ${JSON.stringify({ content: chunk })}\n\n`);
      });
    } catch {
      logger.warn(`Primary model ${PRIMARY_MODEL} failed, trying fallback`);
      usedFallback = true;
      try {
        await callNVIDIA(fullMessages, FALLBACK_MODEL, apiKey, (chunk) => {
          res.write(`event: chunk\ndata: ${JSON.stringify({ content: chunk })}\n\n`);
        });
      } catch (fallbackErr) {
        logger.error(`Fallback model ${FALLBACK_MODEL} also failed`, fallbackErr);
        streamError = true;
        res.write(`event: error\ndata: ${JSON.stringify({ error: 'AI service unavailable' })}\n\n`);
      }
    }

    if (!streamError) {
      res.write(`event: done\ndata: ${JSON.stringify({ modelUsed: usedFallback ? FALLBACK_MODEL : PRIMARY_MODEL })}\n\n`);
    }
    res.end();
  }
);