const APEX = "senseikatana.com";
const WWW = `www.${APEX}`;
const DOCS_HOST = `docs.${APEX}`;
const DOCS_PREFIX = "/docs";
const DOCS_LOCALES = new Set(["en", "es", "ca"]);
const DOCS_ORIGIN = "https://senseikatana-docs.pages.dev";

const SECURITY_HEADERS = {
  "Content-Security-Policy":
    "frame-ancestors 'none'; base-uri 'none'; form-action 'none'",
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "accelerometer=(), camera=(), geolocation=(), gyroscope=(), microphone=(), payment=(), usb=()",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
};

function withSecurity(headers) {
  const out = new Headers(headers);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    out.set(key, value);
  }
  return out;
}

function redirect(url, status) {
  const r = Response.redirect(url, status);
  const headers = withSecurity(r.headers);
  headers.set("Cache-Control", "no-cache");
  return new Response(r.body, { status, headers });
}

function plain(status, body, extra = {}) {
  return new Response(body, {
    status,
    headers: withSecurity({
      "content-type": "text/plain; charset=utf-8",
      ...extra,
    }),
  });
}

async function proxy(target, request, env) {
  const url = new URL(request.url);
  const init = {
    method: request.method,
    headers: request.headers,
    body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
    redirect: "manual",
  };

  let response;
  try {
    response = await fetch(target, init);
  } catch {
    return plain(502, "Bad gateway");
  }

  const headers = withSecurity(response.headers);

  const location = headers.get("Location");
  if (location && location.startsWith(DOCS_ORIGIN)) {
    const newLoc = location.replace(DOCS_ORIGIN, `https://${APEX}${DOCS_PREFIX}`);
    headers.set("Location", newLoc);
  } else if (location && location.startsWith("https://senseikatana-web.pages.dev")) {
    const newLoc = location.replace("https://senseikatana-web.pages.dev", `https://${APEX}`);
    headers.set("Location", newLoc);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname, search } = url;
    const host = url.hostname;

    if (host === WWW) {
      return redirect(`https://${APEX}${pathname}${search}`, 301);
    }

    if (host === DOCS_HOST) {
      const path = pathname === "/" ? "" : pathname;
      return redirect(`https://${APEX}${DOCS_PREFIX}${path}${search}`, 301);
    }

    if (host !== APEX) {
      return plain(404, "Not found");
    }

    const langMatch = /^\/(en|es|ca)\/docs(\/.*)?$/.exec(pathname);
    if (langMatch) {
      const [, lang, rest = "/"] = langMatch;
      let target;
      if (lang === "en") {
        target = `${DOCS_PREFIX}${rest}`;
      } else if (DOCS_LOCALES.has(lang)) {
        target = `${DOCS_PREFIX}/${lang}${rest}`;
      } else {
        return plain(404, "Not found");
      }
      return redirect(`https://${APEX}${target}${search}`, 301);
    }

    if (pathname === DOCS_PREFIX || pathname.startsWith(`${DOCS_PREFIX}/`)) {
      const stripped = pathname.slice(DOCS_PREFIX.length) || "/";
      return proxy(`${DOCS_ORIGIN}${stripped}${search}`, request, env);
    }

    if (pathname === "/hueplay" || pathname.startsWith("/hueplay/")) {
      return env.HUEPLAY.fetch(request);
    }

    if (pathname === "/numplate" || pathname.startsWith("/numplate/")) {
      return env.NUMPLATE.fetch(request);
    }

    return proxy(`https://senseikatana-web.pages.dev${pathname}${search}`, request, env);
  },
};