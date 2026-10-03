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

  const inGamut = (lin) => lin.every((v) => v >= -1e-6 && v <= 1 + 1e-6);

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

  // Tono HSL cuyo color tiene el tono OKLCH indicado, para hsl(*,s,l).
  //
  // Cerca de los primarios (p. ej. el azul) el tono OKLCH apenas reacciona al
  // tono HSL: un tramo de 10-15° de HSL se aplana en un solo grado de OKLCH.
  // Por eso la inversa no es continua y sólo se puede resolver así:
  //   1. si el tono actual ya redondea al objetivo, se devuelve tal cual
  //      (eso hace exacto el recorrido de ida y vuelta);
  //   2. si no, el tono más cercano al objetivo, desempatando por cercanía a
  //      `preferH` para no dar saltos gratuitos.
  // null si el tono no está definido.
  function oklchHueToHslHue(targetH, s, l, preferH = null) {
    if (s <= 0 || l <= 0 || l >= 100) return null;

    const wanted = roundHue(targetH);
    const preferCur = preferH === null ? null : hslHueToOklchHue(preferH, s, l);
    if (preferCur !== null && roundHue(preferCur) === wanted) return preferH;

    let bestH = -1;
    let bestD = Infinity;
    let tieH = -1;
    let tieD = Infinity;

    for (let h = 0; h < 360; h++) {
      const cur = hslHueToOklchHue(h, s, l);
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

  // Los tonos OKLCH de los primarios HSL (0..360 cada 60°) a saturación/luz plenas.
  function primaryOklchHues(s = 100, l = 50) {
    const out = [];
    for (let h = 0; h <= 360; h += 60) out.push(hslHueToOklchHue(h, s, l));
    return out;
  }

  return {
    CHROMA_UNIT,
    hslToRgb,
    rgbToHsl,
    rgbToOklch,
    oklchToRgb,
    hslHueToOklchHue,
    oklchHueToHslHue,
    primaryOklchHues,
  };
})();
