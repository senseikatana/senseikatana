import { useState, useRef, useEffect, useCallback } from 'react';
import { auth, firebaseProjectId, useEmulators } from '../firebase/config';
import { buildFinancialSummary } from '../lib/financialSummary';

const QUICK_ACTIONS = [
  'Analizar mis gastos',
  'Revisar mi presupuesto',
  'Optimizar suscripciones',
  'Plan de ahorro',
  'Reducir deudas',
];

export default function Assistant({ data }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '¡Hola! 👋 Soy tu asistente financiero. Pregúntame sobre tus gastos, presupuesto, ahorro o deudas. ¿En qué puedo ayudarte hoy?' },
  ]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState(null);
  const [showChips, setShowChips] = useState(true);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const abortCtrlRef = useRef(null);
  const panelId = 'assistant-panel';
  const inputId = 'assistant-input';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (open && textareaRef.current) {
      setTimeout(() => textareaRef.current.focus(), 100);
    }
  }, [open]);

  const getFunctionUrl = useCallback(() => {
    if (useEmulators) {
      return `http://localhost:5001/${firebaseProjectId}/us-central1/assistantChat`;
    }
    return import.meta.env.VITE_ASSISTANT_API_URL || `/api/assistantChat`;
  }, []);

  const send = useCallback(async (text) => {
    const trimmed = (text ?? input).trim();
    if (!trimmed || streaming) return;

    const userMsg = { role: 'user', content: trimmed };
    const history = [...messages, userMsg];
    setMessages([...history, { role: 'assistant', content: '' }]);
    setInput('');
    setStreaming(true);
    setError(null);
    setShowChips(false);
    abortCtrlRef.current = new AbortController();

    const financialSummary = buildFinancialSummary(data);
    const apiMessages = history
      .filter(m => m.role === 'user' || m.role === 'assistant')
      .map(m => ({ role: m.role, content: m.content }));

    let token = null;
    try {
      if (auth.currentUser) {
        token = await auth.currentUser.getIdToken();
      }
    } catch {
      token = null;
    }

    let acc = '';
    try {
      const baseUrl = getFunctionUrl();
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          messages: apiMessages,
          financialSummary,
        }),
        signal: abortCtrlRef.current.signal,
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || `Error ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No se pudo iniciar la conexión');

      const decoder = new TextDecoder();
      let buffer = '';

      let done = false;
      while (!done) {
        const result = await reader.read();
        done = result.done;
        const value = result.value;
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split('\n\n');
        buffer = events.pop() || '';

        for (const evt of events) {
          const lines = evt.split('\n');
          let eventData = '';
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              eventData = line.slice(6).trim();
            }
          }
          if (eventData) {
            try {
              const parsed = JSON.parse(eventData);
              if (parsed.content) {
                acc += parsed.content;
                setMessages(prev => {
                  const copy = [...prev];
                  copy[copy.length - 1] = { role: 'assistant', content: acc };
                  return copy;
                });
              }
            } catch {
              // skip malformed SSE data lines
            }
          }
        }
      }
    } catch (e) {
      if (e.name === 'AbortError') {
        if (acc.length > 0) {
          setMessages(prev => {
            const copy = [...prev];
            if (copy[copy.length - 1]?.role === 'assistant' && copy[copy.length - 1].content === '') {
              copy[copy.length - 1].content = acc;
            }
            return copy;
          });
        }
      } else {
        setError(e.message || 'Error conectando con el asistente');
        setMessages(prev => {
          const copy = [...prev];
          if (copy[copy.length - 1]?.role === 'assistant' && !copy[copy.length - 1].content) {
            copy.pop();
          }
          return copy;
        });
        setShowChips(true);
      }
    } finally {
      setStreaming(false);
      abortCtrlRef.current = null;
    }
  }, [input, streaming, messages, data, getFunctionUrl]);

  const stop = useCallback(() => {
    abortCtrlRef.current?.abort();
    setStreaming(false);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      <button
        className="assistant-fab"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Cerrar asistente' : 'Abrir asistente'}
        title="Asistente IA"
      >
        {open ? '✕' : '💬'}
      </button>

      {open && (
        <div className="assistant-panel" role="dialog" aria-label="Asistente financiero" aria-modal="true">
          <div className="assistant-header">
            <div className="assistant-title">
              <span className="assistant-avatar" aria-hidden="true">🤖</span>
              <div>
                <strong>Asistente Financiero</strong>
                <span className="assistant-status">
                  {streaming ? 'escribiendo...' : 'en línea'}
                </span>
              </div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => setOpen(false)} aria-label="Cerrar asistente">✕</button>
          </div>

          <div className="assistant-messages" id={panelId} tabIndex={-1}>
            {messages.map((m, i) => (
              <div key={i} className={`assistant-msg ${m.role}`}>
                <div className="assistant-bubble">
                  {m.content || (m.role === 'assistant' && streaming && i === messages.length - 1 ? (
                    <span className="assistant-typing" aria-label="Escribiendo">
                      <span></span><span></span><span></span>
                    </span>
                  ) : '')}
                </div>
              </div>
            ))}
            {error && (
              <div className="assistant-error" role="alert">⚠️ {error}</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {showChips && !streaming && !error && (
            <div className="assistant-chips" role="group" aria-label="Acciones rápidas">
              {QUICK_ACTIONS.map(a => (
                <button key={a} className="btn btn-ghost btn-sm" onClick={() => send(a)} aria-label={`Preguntar: ${a}`}>
                  {a}
                </button>
              ))}
            </div>
          )}

          <div className="assistant-input-row">
            <textarea
              id={inputId}
              ref={textareaRef}
              className="assistant-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu pregunta... (Enter para enviar, Shift+Enter para salto)"
              rows={1}
              disabled={streaming}
              aria-label="Mensaje al asistente"
            />
            {streaming ? (
              <button className="btn btn-red btn-sm assistant-send" onClick={stop} aria-label="Detener respuesta">⏹</button>
            ) : (
              <button className="btn btn-primary assistant-send" onClick={() => send()} disabled={!input.trim()} aria-label="Enviar">➤</button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
