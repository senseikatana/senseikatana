import { describe, expect, test } from "bun:test";
import "../color.js";

const CM = globalThis.ColorMath;

const circ = (a, b) => {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
};

describe("referencias publicadas de OKLab/OKLCH", () => {
  test("rojo #ff0000", () => {
    const o = CM.rgbToOklch(1, 0, 0);
    expect(o.l).toBeCloseTo(0.6279554, 4);
    expect(o.c).toBeCloseTo(0.2576833, 4);
    expect(o.h).toBeCloseTo(29.2338, 2);
  });

  test("primarios HSL (S=100, L=50) dan los tonos OKLCH esperados", () => {
    const expected = [29.23, 109.77, 142.5, 194.77, 264.05, 328.36];
    const prims = CM.primaryOklchHues(100, 50).slice(0, 6);
    prims.forEach((v, i) => expect(v).toBeCloseTo(expected[i], 1));
  });

  test("blanco y negro", () => {
    expect(CM.rgbToOklch(1, 1, 1).l).toBeCloseTo(1, 6);
    expect(CM.rgbToOklch(0, 0, 0).l).toBeCloseTo(0, 6);
  });
});

describe("round-trip de tono HSL <-> OKLCH", () => {
  test("HSL -> OKLCH redondeado -> HSL devuelve el original (0 fallos)", () => {
    let n = 0;
    for (let s = 10; s <= 100; s += 10) {
      for (let l = 10; l <= 90; l += 10) {
        for (let h = 0; h < 360; h++) {
          const f = CM.hslHueToOklchHue(h, s, l);
          if (f === null) continue;
          n++;
          expect(CM.oklchHueToHslHue(Math.round(f), s, l, h)).toBe(h);
        }
      }
    }
    expect(n).toBeGreaterThan(30000);
  });

  test("la equivalencia depende de S y L, no sólo del ángulo", () => {
    const a = CM.hslHueToOklchHue(240, 100, 50);
    const b = CM.hslHueToOklchHue(240, 30, 40);
    expect(Math.abs(a - b)).toBeGreaterThan(5);
  });

  test("el arrastre del slider OKLCH no da saltos gratuitos", () => {
    let prev = CM.oklchHueToHslHue(0, 65, 50, 0) ?? 0;
    let jumps = 0;
    for (let t = 1; t <= 360; t++) {
      const cur = CM.oklchHueToHslHue(t, 65, 50, prev);
      if (cur === null) continue;
      if (circ(cur, prev) > 3) jumps++;
      prev = cur;
    }
    expect(jumps).toBeLessThan(30);
  });
});

describe("round-trip de color RGB <-> OKLCH", () => {
  test("cada canal vuelve al valor original", () => {
    let worst = 0;
    for (let h = 0; h < 360; h += 5) {
      const rgb = CM.hslToRgb(h, 60, 50);
      const o = CM.rgbToOklch(rgb[0], rgb[1], rgb[2]);
      const back = CM.oklchToRgb(o.l, o.c, o.h);
      for (let i = 0; i < 3; i++) worst = Math.max(worst, Math.abs(back[i] - rgb[i]));
    }
    expect(worst).toBeLessThan(1e-3);
  });

  test("la croma fuera de gamut se reduce, no se desborda", () => {
    const out = CM.oklchToRgb(0.5, 0.4, 30);
    for (const v of out) {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(1);
    }
    expect(out[0]).toBeGreaterThan(out[1]);
  });
});

describe("casos degenerados", () => {
  test("acromáticos y luz extrema devuelven null", () => {
    expect(CM.hslHueToOklchHue(0, 0, 50)).toBeNull();
    expect(CM.hslHueToOklchHue(0, 100, 0)).toBeNull();
    expect(CM.hslHueToOklchHue(0, 100, 100)).toBeNull();
    expect(CM.oklchHueToHslHue(30, 0, 50)).toBeNull();
    expect(CM.oklchHueToHslHue(30, 100, 0)).toBeNull();
  });

  test("si el tono actual ya coincide no se mueve", () => {
    expect(CM.oklchHueToHslHue(264, 100, 50, 237)).toBe(237);
  });
});

describe("parseo de colores CSS", () => {
  const hexOf = (s) => {
    const p = CM.parseCssColor(s);
    return p === null ? null : CM.formatHex(p.r, p.g, p.b);
  };

  test("hex con y sin #, 3/4/6/8 dígitos, mayúsculas", () => {
    expect(hexOf("#f00")).toBe("#ff0000");
    expect(hexOf("#FF0000")).toBe("#ff0000");
    expect(hexOf("ff0000")).toBe("#ff0000");
    expect(hexOf("#0f08")).toBe("#00ff00");
    expect(hexOf("#123456")).toBe("#123456");
    expect(hexOf("#12345")).toBeNull();
    expect(hexOf("#zzzzzz")).toBeNull();
    expect(hexOf("")).toBeNull();
  });

  test("rgb en sintaxis moderna y legada", () => {
    expect(hexOf("rgb(255, 0, 0)")).toBe("#ff0000");
    expect(hexOf("rgb(255 0 0)")).toBe("#ff0000");
    expect(hexOf("rgba(255,0,0,0.5)")).toBe("#ff0000");
    expect(hexOf("rgb(100% 0% 0%)")).toBe("#ff0000");
    expect(hexOf("rgb(a, b, c)")).toBeNull();
  });

  test("hsl en sintaxis moderna y legada", () => {
    expect(hexOf("hsl(0, 100%, 50%)")).toBe("#ff0000");
    expect(hexOf("hsl(0 100% 50%)")).toBe("#ff0000");
    expect(hexOf("hsl(49, 100%, 50%)")).toBe("#ffd000");
    expect(hexOf("hsl(120 100 50)")).toBe("#00ff00");
  });

  test("oklch acepta croma en % y en número", () => {
    const a = CM.parseCssColor("oklch(62.8% 64.4% 29.2)");
    const b = CM.parseCssColor("oklch(0.628 0.2576 29.23)");
    expect(a).not.toBeNull();
    expect(b).not.toBeNull();
    expect(CM.formatHex(a.r, a.g, a.b)).toBe("#ff0001");
    expect(CM.formatHex(b.r, b.g, b.b)).toBe("#ff0000");
    // 64.4% de 0.4 = 0.2576: las dos notaciones son el mismo color
    expect(Math.abs(a.r - b.r)).toBeLessThan(0.01);
  });

  test("lch() ya no es una notación soportada (se retiró por estar fuera de gamut en web)", () => {
    expect(CM.parseCssColor("lch(54.29% 106.84 40.86)")).toBeNull();
    expect(CM.parseCssColor("lch(54.3 106.8 40.9)")).toBeNull();
    expect(CM.parseLch).toBeUndefined();
    expect(CM.formatLch).toBeUndefined();
    expect(CM.rgbToLch).toBeUndefined();
    expect(CM.lchToRgb).toBeUndefined();
  });

  test("parseOkLchTriple devuelve el triple escrito, sin recortar al gamut", () => {
    const t = CM.parseOkLchTriple("oklch(50% 100% 30)");
    expect(t).toEqual({ l: 0.5, c: 0.4, h: 30 });
    expect(CM.inSrgbGamut(t.l, t.c, t.h)).toBe(false);
    const inGamut = CM.parseOkLchTriple("oklch(62.8% 64.42% 29.23)");
    expect(inGamut.h).toBeCloseTo(29.23, 2);
    expect(CM.inSrgbGamut(inGamut.l, inGamut.c, inGamut.h)).toBe(true);
    expect(CM.parseOkLchTriple("hsl(0 100% 50%)")).toBeNull();
    expect(CM.parseOkLchTriple("oklch(1 2)")).toBeNull();
  });

  test("entradas que no son colores devuelven null", () => {
    for (const bad of ["", "  ", "hola", "rgb()", "oklch(1 2)", "12345678901234"]) {
      expect(CM.parseCssColor(bad)).toBeNull();
    }
  });

  test("formatear y volver a parsear conserva el color", () => {
    for (const [r, g, b] of [[1, 0, 0], [0.5, 0.25, 0.75], [0, 1, 1], [0.13, 0.47, 0.9]]) {
      for (const s of [CM.formatHex(r, g, b), CM.formatHsl(r, g, b), CM.formatOklch(r, g, b)]) {
        const p = CM.parseCssColor(s);
        expect(p).not.toBeNull();
        expect(Math.abs(p.r - r)).toBeLessThan(2 / 255);
        expect(Math.abs(p.g - g)).toBeLessThan(2 / 255);
        expect(Math.abs(p.b - b)).toBeLessThan(2 / 255);
      }
    }
  });

  test("los formatos salen con la sintaxis esperada", () => {
    expect(CM.formatHex(1, 0, 0)).toBe("#ff0000");
    expect(CM.formatHsl(1, 0, 0)).toBe("hsl(0, 100%, 50%)");
    expect(CM.formatOklch(1, 0, 0)).toBe("oklch(62.8% 64.42% 29.23)");
  });
});

describe("aviso de gamut", () => {
  test("detecta triples OKLCH que no caben en sRGB", () => {
    expect(CM.inSrgbGamut(0.5, 0.4, 30)).toBe(false); // croma 100%
    expect(CM.inSrgbGamut(0.5, 0.26, 30)).toBe(false); // aún por encima del techo
    expect(CM.inSrgbGamut(0.627955, 0.257683, 29.2338)).toBe(true); // el rojo real
    expect(CM.inSrgbGamut(0.97, 0.02, 90)).toBe(true); // casi blanco
  });
});
