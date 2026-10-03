// Conversiones de color puras: HSL <-> sRGB <-> OKLCH. Sin acceso al DOM.
// Se carga como <script> clásico en el navegador y como módulo en los tests de Node.

globalThis.ColorMath = (() => {
  "use strict";

  // oklch(): 100% de croma equivale a 0.4 (CSS Color 4).
  const CHROMA_UNIT = 0.4;

  const clamp = (x, lo, hi) => (x < lo ? lo : x > hi ? hi : x);
  const toLinear = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const toSrgb = (c) => (c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055);

  // h en grados, s y l en porcentaje -> [r,g,b] en [0,1]
  function hslToRgb(h, s, l) {
    h = ((h % 360) + 360) % 360;
    s = clamp(s, 0, 100) / 100;
    l = clamp(l, 0, 100) / 100;
    const a = s * Math.min(l, 1 - l);
    const k = (n) => (n + h / 30) % 12;
    const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [f(0), f(8), f(4)];
  }

  // [r,g,b] en [0,1] -> {h,s,l} con h en [0,360) y s,l en porcentaje
  function rgbToHsl(r, g, b) {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;
    const l = (max + min) / 2;
    if (d === 0) return { h: 0, s: 0, l: l * 100 };
    const s = d / (1 - Math.abs(2 * l - 1));
    let h;
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
    return { h, s: s * 100, l: l * 100 };
  }

  // [r,g,b] en [0,1] -> {l,c,h} en OKLCH (h en grados)
  function rgbToOklch(r, g, b) {
    const lr = toLinear(r);
    const lg = toLinear(g);
    const lb = toLinear(b);
    const l_ = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
    const m_ = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
    const s_ = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
    const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
    const A = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
    const B = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;
    let h = (Math.atan2(B, A) * 180) / Math.PI;
    if (h < 0) h += 360;
    return { l: L, c: Math.hypot(A, B), h };
  }

  // OKLCH -> sRGB lineal. Puede salirse del gamut.
  function oklchToLinear(l, c, h) {
    const rad = (h * Math.PI) / 180;
    const A = c * Math.cos(rad);
    const B = c * Math.sin(rad);
    const l_ = l + 0.3963377774 * A + 0.2158037573 * B;
    const m_ = l - 0.1055613458 * A - 0.0638541728 * B;
    const s_ = l - 0.0894841775 * A - 1.291485548 * B;
    const l3 = l_ * l_ * l_;
    const m3 = m_ * m_ * m_;
    const s3 = s_ * s_ * s_;
    return [
      4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3,
      -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3,
      -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3,
    ];
  }

  // Tolerancia generosa a propósito. Los primarios sRGB viven justo en el borde
  // del gamut y el redondeo al formatear (un decimal) los empuja apenas fuera
  // (medido: hasta 3.1e-3 en lineal). En ese caso interesa RECORRAR el exceso,
  // no reducir croma, porque la croma no es monótona en el gamut: el canal
  // lineal es cúbico en C, así que cruza cero y vuelve, y una búsqueda binaria
  // sobre C converge al primer cruce (p. ej. 0.266 en vez de 0.313 para el
  // azul) y devuelve un color muy distinto. 1e-2 deja margen de sobra y los
  // colores realmente fuera de gamut (exceso ~0.16) siguen reduciendo croma.
  const GAMUT_EPS = 1e-2;
  const inGamut = (lin) => lin.every((v) => v >= -GAMUT_EPS && v <= 1 + GAMUT_EPS);

  // OKLCH -> sRGB [0,1]. Si la croma no cabe en sRGB, se reduce hasta que quepa.
  function oklchToRgb(l, c, h) {
    const L = clamp(l, 0, 1);
    const encode = (lin) => lin.map((v) => clamp(toSrgb(clamp(v, 0, 1)), 0, 1));

    // Luz fuera de rango (negra o blanca): la croma no tiene significado.
    if (!inGamut(oklchToLinear(L, 0, h))) return encode(oklchToLinear(L, 0, h));

    if (inGamut(oklchToLinear(L, c, h))) return encode(oklchToLinear(L, c, h));

    let lo = 0;
    let hi = c;
    for (let i = 0; i < 24; i++) {
      const mid = (lo + hi) / 2;
      if (inGamut(oklchToLinear(L, mid, h))) lo = mid;
      else hi = mid;
    }
    return encode(oklchToLinear(L, lo, h));
  }

  const ACHROMATIC_C = 1e-4;

  const circularDistance = (a, b) => {
    const d = Math.abs(a - b) % 360;
    return d > 180 ? 360 - d : d;
  };

  // Valor entero de tono en [0,360), igual que lo que almacena un slider.
  const roundHue = (x) => ((Math.round(x) % 360) + 360) % 360;

  // Tono OKLCH del color hsl(h,s,l). null si el tono no está definido.
  function hslHueToOklchHue(h, s, l) {
    if (s <= 0 || l <= 0 || l >= 100) return null;
    const [r, g, b] = hslToRgb(h, s, l);
    const o = rgbToOklch(r, g, b);
    return o.c < ACHROMATIC_C ? null : o.h;
  }


  // Los tonos OKLCH de los primarios HSL (0..360 cada 60°) a saturación/luz plenas.
  function primaryOklchHues(s = 100, l = 50) {
    const out = [];
    for (let h = 0; h <= 360; h += 60) out.push(hslHueToOklchHue(h, s, l));
    return out;
  }

  // ------------------------------------------------------------------ inversa
  //
  // Compartida por OKLCH y LCH: la relación no es inyectiva cerca de los
  // primarios, así que primero se reconoce si el tono actual ya representa al
  // objetivo (eso hace exacto el recorrido de ida y vuelta) y sólo si no, se
  // busca el más cercano desempatando por cercanía a `preferH`.
  function inverseHue(targetH, s, l, forward, preferH) {
    if (s <= 0 || l <= 0 || l >= 100) return null;

    const wanted = roundHue(targetH);
    const preferCur = preferH === null ? null : forward(preferH, s, l);
    if (preferCur !== null && roundHue(preferCur) === wanted) return preferH;

    let bestH = -1;
    let bestD = Infinity;
    let tieH = -1;
    let tieD = Infinity;

    for (let h = 0; h < 360; h++) {
      const cur = forward(h, s, l);
      if (cur === null) continue;
      const d = circularDistance(cur, targetH);
      if (d < bestD - 1e-12) {
        bestD = d;
        bestH = h;
        tieH = h;
        tieD = preferH === null ? 0 : circularDistance(h, preferH);
      } else if (d <= bestD + 1e-12 && preferH !== null) {
        const pd = circularDistance(h, preferH);
        if (pd < tieD) {
          tieH = h;
          tieD = pd;
        }
      }
    }

    if (bestH < 0) return null;
    return tieH < 0 ? bestH : tieH;
  }

  function oklchHueToHslHue(targetH, s, l, preferH = null) {
    return inverseHue(targetH, s, l, hslHueToOklchHue, preferH);
  }

  // --------------------------------------------------------------- parseo CSS
  //
  // Se acepta sintaxis moderna (`rgb(255 0 0)`, `rgb(255 0 0 / .5)`) y legada
  // (`rgb(255, 0, 0)`). El alfa se lee pero se descarta: la herramienta no
  // tiene canal alfa.

  function matchFunc(str, names) {
    const m = String(str).trim().match(/^([a-z]+)\((.*)\)$/is);
    if (!m || !names.includes(m[1].toLowerCase())) return null;
    return m[2];
  }

  // Máximo 4 argumentos: los tres componentes y, opcionalmente, el alfa
  // (`rgb(255 0 0 / .5)`). Más que eso no es un color CSS.
  const MAX_ARGS = 4;
  const splitArgs = (inner) => {
    const parts = inner
      .replace(/\//g, " ")
      .replace(/,/g, " ")
      .trim()
      .split(/\s+/)
      .filter((t) => t !== "");
    return parts.length > MAX_ARGS ? [] : parts;
  };

  // Valor con % o en número: `x%` -> pct/100*unit, número -> tal cual.
  const readRatio = (tok, unit) => {
    const s = String(tok).trim();
    if (s.endsWith("%")) {
      const v = parseFloat(s);
      return Number.isFinite(v) ? (v / 100) * unit : NaN;
    }
    return parseFloat(s);
  };

  function parseHex(str) {
    const s = String(str).trim().replace(/^#/, "");
    if (!/^[0-9a-f]+$/i.test(s)) return null;
    let hex = s;
    if (hex.length === 3 || hex.length === 4) hex = [...hex].map((c) => c + c).join("");
    if (hex.length !== 6 && hex.length !== 8) return null;
    const n = parseInt(hex, 16);
    if (hex.length === 8) {
      return {
        r: ((n >>> 24) & 255) / 255,
        g: ((n >>> 16) & 255) / 255,
        b: ((n >>> 8) & 255) / 255,
        a: (n & 255) / 255,
      };
    }
    return { r: ((n >>> 16) & 255) / 255, g: ((n >>> 8) & 255) / 255, b: (n & 255) / 255, a: 1 };
  }

  function parseRgb(str) {
    const inner = matchFunc(str, ["rgb", "rgba"]);
    if (inner === null) return null;
    const t = splitArgs(inner);
    if (t.length < 3) return null;
    const chan = (tok) => {
      const s = String(tok).trim();
      if (s.endsWith("%")) {
        const v = parseFloat(s);
        return Number.isFinite(v) ? clamp(v / 100, 0, 1) : NaN;
      }
      const v = parseFloat(s);
      return Number.isFinite(v) ? clamp(v / 255, 0, 1) : NaN;
    };
    const r = chan(t[0]);
    const g = chan(t[1]);
    const b = chan(t[2]);
    if (![r, g, b].every(Number.isFinite)) return null;
    return { r, g, b, a: 1 };
  }

  function parseHsl(str) {
    const inner = matchFunc(str, ["hsl", "hsla"]);
    if (inner === null) return null;
    const t = splitArgs(inner);
    if (t.length < 3) return null;
    const h = parseFloat(t[0]);
    const s = readRatio(t[1], 100);
    const l = readRatio(t[2], 100);
    if (![h, s, l].every(Number.isFinite)) return null;
    const [r, g, b] = hslToRgb(h, s, l);
    return { r, g, b, a: 1 };
  }

  function parseOkLch(str) {
    const inner = matchFunc(str, ["oklch"]);
    if (inner === null) return null;
    const t = splitArgs(inner);
    if (t.length < 3) return null;
    const L = readRatio(t[0], 1);
    const C = readRatio(t[1], CHROMA_UNIT);
    const H = parseFloat(t[2]);
    if (![L, C, H].every(Number.isFinite)) return null;
    const [r, g, b] = oklchToRgb(L, C, H);
    return { r, g, b, a: 1 };
  }

  // Triple OKLCH tal y como está escrito (L 0..1, C 0..0.4+, H en grados),
  // sin recortarlo al gamut. Lo usa la UI para enseñar un oklch() fuera de
  // gamut tal cual se tecleó y poder mostrar el aviso "Fuera de Gamut".
  function parseOkLchTriple(str) {
    const inner = matchFunc(str, ["oklch"]);
    if (inner === null) return null;
    const t = splitArgs(inner);
    if (t.length < 3) return null;
    const L = readRatio(t[0], 1);
    const C = readRatio(t[1], CHROMA_UNIT);
    const H = parseFloat(t[2]);
    if (![L, C, H].every(Number.isFinite)) return null;
    return { l: L, c: C, h: ((H % 360) + 360) % 360 };
  }

  function parseCssColor(str) {
    const s = String(str).trim();
    if (!s) return null;
    const bareHex = /^[0-9a-f]{3}$/i.test(s) || /^[0-9a-f]{4}$/i.test(s) ||
      /^[0-9a-f]{6}$/i.test(s) || /^[0-9a-f]{8}$/i.test(s);
    if (s.startsWith("#") || bareHex) return parseHex(s);
    return parseRgb(s) ?? parseHsl(s) ?? parseOkLch(s);
  }

  // --------------------------------------------------------------- formato CSS

  // Quita ceros sobrantes: 50.00 -> "50", 62.7955 -> "62.8".
  // Dos decimales no son capricho: con uno la vuelta al color original se
  // desvía hasta 3.3/255 en los primarios; con dos, 0.4/255.
  const fmt = (n, d = 2) => String(Number(n.toFixed(d)));
  const clampInt = (x, lo, hi) => clamp(Math.round(x), lo, hi);

  function formatHex(r, g, b) {
    const q = (v) => clampInt(v * 255, 0, 255).toString(16).padStart(2, "0");
    return `#${q(r)}${q(g)}${q(b)}`;
  }

  function formatHsl(r, g, b) {
    const { h, s, l } = rgbToHsl(r, g, b);
    return `hsl(${clampInt(h, 0, 359)}, ${fmt(s)}%, ${fmt(l)}%)`;
  }

  function formatOklch(r, g, b) {
    const o = rgbToOklch(r, g, b);
    return `oklch(${fmt(o.l * 100)}% ${fmt((o.c / CHROMA_UNIT) * 100)}% ${fmt(o.h)})`;
  }

  // ¿Cabe el triple OKLCH en sRGB tal cual, o el navegador va a recortar?
  const inSrgbGamut = (l, c, h) => inGamut(oklchToLinear(clamp(l, 0, 1), c, h));

  return {
    CHROMA_UNIT,
    hslToRgb,
    rgbToHsl,
    rgbToOklch,
    oklchToRgb,
    hslHueToOklchHue,
    oklchHueToHslHue,
    primaryOklchHues,
    inSrgbGamut,
    parseHex,
    parseRgb,
    parseHsl,
    parseOkLch,
    parseOkLchTriple,
    parseCssColor,
    formatHex,
    formatHsl,
    formatOklch,
  };
})();
