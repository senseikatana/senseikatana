import { serve } from 'bun';
import { readFileSync } from 'fs';

const port = process.env.PORT || 4321;

serve({
  port,
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === '/') {
      return new Response(readFileSync('index.html'), {
        headers: { 'Content-Type': 'text/html' },
      });
    }
    // Servir archivos estáticos desde la raíz
    // ...
  },
});




console.log(`Server running at http://localhost:${port}`);