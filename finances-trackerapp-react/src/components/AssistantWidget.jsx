'use client';

import { useState, useRef, useCallback } from 'react';
import { auth, firebaseProjectId, useEmulators } from '@/firebase/config';
import { useData } from '@/context/DataProvider';
import { buildFinancialSummary } from '@/lib/financialSummary';

export default function AssistantWidget() {
  const { data } = useData();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '¡Hola! 👋 Soy tu asistente financiero.' },
  ]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const abortRef = useRef(null);

  const send = useCallback(async (text) => {
    const trimmed = (text ?? input).trim();
    if (!trimmed || streaming) return;

    const userMsg = { role: 'user', content: trimmed };
    const history = [...messages, userMsg];
    setMessages([...history, { role: 'assistant', content: '' }]);
    setInput('');
    setStreaming(true);
    setError(null);
    abortRef.current = new AbortController();

    const summary = buildFinancialSummary(data);
    const apiMsgs = history.map(m => ({ role: m.role, content: m.content }));

    let token = null;
    try { if (auth.currentUser) token = await auth.currentUser.getIdToken(); } catch {}

    let acc = '';
    try {
      const baseUrl = useEmulators
        ? `http://localhost:5001/${firebaseProjectId}/us-central1/assistantChat`
        : '/api/assistantChat';

      const res = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ messages: apiMsgs, financialSummary: summary }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) throw new Error(`Error ${res.status}`);

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No stream');

      const decoder = new TextDecoder();
      let buf = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        for (const line of buf.split('\n')) {
          if (line.startsWith('data: ')) {
            try {
              const d = JSON.parse(line.slice(6));
              if (d.content) {
                acc += d.content;
                setMessages(prev => { const c = [...prev]; c[c.length-1] = { role: 'assistant', content: acc }; return c; });
              }
            } catch {}
          }
        }
        buf = '';
      }
    } catch (e) {
      if (e.name !== 'AbortError') {
        setError(e.message);
        setMessages(prev => { const c = [...prev]; if (!c[c.length-1].content) c.pop(); return c; });
      }
    } finally {
      setStreaming(false);
    }
  }, [input, streaming, messages, data]);

  const stop = () => { abortRef.current?.abort(); setStreaming(false); };

  return (
    <>
      <button className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-white shadow-lg flex items-center justify-center text-2xl hover:bg-primary-light transition-all z-50" onClick={() => setOpen(!open)} aria-label="Asistente IA">
        {open ? '✕' : '💬'}
      </button>

      {open && (
        <div className="fixed bottom-24 right-4 w-[360px] h-[500px] bg-white rounded-xl shadow-2xl flex flex-col z-50 overflow-hidden border border-border md:right-6 md:bottom-24">
          <div className="bg-primary text-white p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">🤖</div>
            <div className="flex-1">
              <div className="font-semibold text-sm">Asistente Financiero</div>
              <div className="text-xs opacity-70">{streaming ? 'escribiendo...' : 'en línea'}</div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white">✕</button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap ${m.role === 'user' ? 'bg-blue text-white rounded-br-sm' : 'bg-white border border-border rounded-bl-sm'}`}>
                  {m.content || (streaming && i === messages.length-1 ? '● ● ●' : '')}
                </div>
              </div>
            ))}
            {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg text-center">⚠️ {error}</div>}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-border bg-white flex gap-2">
            <textarea
              className="flex-1 resize-none border border-border rounded-lg p-2 text-sm max-h-24"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Escribe tu pregunta..."
              rows={1}
              disabled={streaming}
            />
            {streaming ? (
              <button onClick={stop} className="w-9 h-9 rounded-lg bg-red text-white flex items-center justify-center">⏹</button>
            ) : (
              <button onClick={() => send()} disabled={!input.trim()} className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center disabled:opacity-50">➤</button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

