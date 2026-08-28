// Version Johnmircha

const CACHE_NAME: string = "name-of-caché";

const URI_STATIC: Array<string> = [
  "https://fonts.googleapis.com/css?family=Raleway:400,700",
  "https://fonts.gstatic.com/s/raleway/v12/1Ptug8zYS_SKggPNyCMIT5lu.woff2",
  "https://fonts.gstatic.com/s/raleway/v12/1Ptug8zYS_SKggPNyC0ITw.woff2",
  "https://fonts.gstatic.com/s/raleway/v12/1Ptrg8zYS_SKggPNwJYtWqhPAMif.woff2",
  "https://fonts.gstatic.com/s/raleway/v12/1Ptrg8zYS_SKggPNwJYtWqZPAA.woff2",
  "https://use.fontawesome.com/releases/v5.5.0/css/all.css",
  "https://use.fontawesome.com/releases/v5.5.0/webfonts/fa-solid-900.woff2",
  "https://use.fontawesome.com/releases/v5.5.0/webfonts/fa-brands-400.woff2",
  "https://use.fontawesome.com/releases/v5.5.0/webfonts/fa-regular-400.woff2",
  "https://cdnjs.cloudflare.com/ajax/libs/hamburgers/1.1.3/hamburgers.min.css",
  "./style.css",
  "./script.js",
  "./humans.txt",

  "./sitemap.xml",
  "/img/favicon1024.png",
  "/img/favicon512.png",
  "/img/favicon384.png",
  "/img/favicon256.png",
  "/img/favicon192.png",
  "/img/favicon128.png",
  "/img/favicon96.png",
  "/img/favicon64.png",
  "/img/favicon32.png",
  "./img/favicon.png",
  "./img/apple-touch-startup-image.png",
  "./img/apple-touch-icon.png",
  "./img/logo.png",
  "/",
  "/acerca",
  "/contacto",
];

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos

// addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void
self.addEventListener("install", (e: Event) => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache: Cache) => {
        return cache.addAll(urlsToCache).then(() => self.skipWaiting());
      })
      .catch((error: Error) =>
        console.log("Falló registro de cache", error.message)
      )
  );
});

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener("activate", (e: Event) => {
  const CACHE_WHITELIST: Array<string> | string[] = [CACHE_NAME];
  e.waitUntil(
    caches
      .keys()
      .then((cacheNames: string[]) => {
        return Promise.all(
          cacheNames.map((cacheName: string | string[]) => {
            if (CACHE_WHITELIST.indexOf(cacheNames) === -1)
              return caches.delete(cacheName);
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e: Event) => {
  e.respondWith(caches.match(e.request)).then((reply: Response) => {
    if (reply) {
      return reply;
    }
    return fetch(e.request);
  });
});
