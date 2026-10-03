// Edge router: monta la app en /showcase/* y controla SPA fallback + headers.
const BASE = "/showcase";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname } = url;

    // /showcase -> /showcase/
    if (pathname === BASE) {
      return Response.redirect(`${url.origin}${BASE}/`, 301);
    }

    // Raíz del dominio: sirve la sección showcase.
    if (pathname === "/") {
      return Response.redirect(`${url.origin}${BASE}/`, 302);
    }

    if (!pathname.startsWith(`${BASE}/`)) {
      return new Response("Not found", {
        status: 404,
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    }

    // Quita el prefijo: /showcase/styles.css -> /styles.css
    const assetPath = pathname.slice(BASE.length) || "/";
    const target = new URL(assetPath + url.search, url.origin);

    const response = await env.ASSETS.fetch(new Request(target, request));

    const headers = new Headers(response.headers);
    const isStatic = /\.(js|css|png|jpe?g|gif|svg|webp|ico|woff2?)$/i.test(assetPath);
    // Sin fingerprint en el nombre: no cachear de forma agresiva.
    headers.set(
      "Cache-Control",
      isStatic ? "public, max-age=300, must-revalidate" : "no-cache",
    );
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
