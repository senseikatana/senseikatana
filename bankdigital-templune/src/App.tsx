/**
 * Componente raíz. Define el router de la aplicación.
 */
import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { Home } from './routes/Home';
import { Dashboard } from './routes/Dashboard';

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container py-4">
        <Suspense fallback={<p className="text-muted">Cargando…</p>}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<h1 className="h4">Página no encontrada</h1>} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}
