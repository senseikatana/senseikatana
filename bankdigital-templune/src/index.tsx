/**
 * Punto de entrada del cliente React (SPA).
 * Monta el árbol de React Router + TanStack Query dentro de #root.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';

const queryClient = new QueryClient();

const container = document.getElementById('root');
if (!container) {
  throw new Error('No se encontró el elemento con id "root"');
}

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
