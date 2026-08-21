import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";
import SkipLink from "~/layout/SkipLink";
import Footer from "~/layout/Footer";
import "~/styles/global.css";

/**
 * Root layout de la aplicación.
 * Configura el MetaProvider, rutas y layout principal.
 */
export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          {/* SEO y Meta */}
          <Title>SINGHA — Nacida del Oro</Title>
          <Meta charset="utf-8" />
          <Meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          />
          <Meta
            name="description"
            content="Singha: cerveza premium tailandesa nacida en 1933. Descubre su historia de 93 años de leyenda dorada."
          />
          <Meta name="theme-color" content="#051710" />
          <Meta property="og:title" content="SINGHA — Nacida del Oro" />
          <Meta
            property="og:description"
            content="93 años de leyenda dorada condensados en una cerveza."
          />
          <Meta property="og:type" content="website" />
          <Meta property="og:image" content="/images/og-singha.jpg" />
          <Meta name="twitter:card" content="summary_large_image" />

          {/* Preconnect y Fonts */}
          <Link rel="preconnect" href="https://cdn.jsdelivr.net" />
          <Link
            href="https://cdn.jsdelivr.net/fontsource/css/cinzel@latest/latin.css"
            rel="stylesheet"
          />
          <Link
            href="https://cdn.jsdelivr.net/fontsource/css/archivo@latest/latin.css"
            rel="stylesheet"
          />
          
          {/* Favicon */}
          <Link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <Link rel="canonical" href="https://singha.beer" />

          {/* Skip Link para accesibilidad */}
          <SkipLink />

          {/* Contenido principal */}
          <main id="main-content">
            <Suspense>{props.children}</Suspense>
          </main>

          {/* Footer (oculto en homepage) */}
          <Footer />
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
