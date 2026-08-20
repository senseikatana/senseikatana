import { describe, it, expect } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from '../src/App';

function renderApp(entry: string): string {
  const queryClient = new QueryClient();
  return renderToString(
    <MemoryRouter initialEntries={[entry]}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </MemoryRouter>
  );
}

describe('App (SSR)', () => {
  it('renderiza la Home en "/"', () => {
    const html = renderApp('/');
    expect(html).toContain('banca digital');
  });

  it('muestra el Dashboard en "/dashboard"', () => {
    const html = renderApp('/dashboard');
    expect(html.toLowerCase()).toContain('dashboard');
  });

  it('muestra 404 en una ruta desconocida', () => {
    const html = renderApp('/no-existe');
    expect(html.toLowerCase()).toContain('no encontrada');
  });
});
