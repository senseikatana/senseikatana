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
