// ---------------------------------------------------------------------------
// Estado y referencias DOM
// ---------------------------------------------------------------------------
const $ = (id) => document.getElementById(id);

const wrapper = $("dialWrapper");
const pointer = $("pointer");
const angleDisplay = $("angleDisplay");
const hslRing = $("hslRing");
const oklchRing = $("oklchRing");

// [clave, id del slider, id del número, mínimo, máximo]
const FIELDS = [
  ["hslHue", "hslHueSlider", "hslHueNum", 0, 360],
  ["hslSat", "hslSatSlider", "hslSatNum", 0, 100],
  ["hslLight", "hslLightSlider", "hslLightNum", 0, 100],
  ["oklchHue", "oklchHueSlider", "oklchHueNum", 0, 360],
  ["oklchChroma", "oklchChromaSlider", "oklchChromaNum", 0, 100],
  ["oklchLight", "oklchLightSlider", "oklchLightNum", 0, 100],
];

const RANGE = {};
const NUM = {};
for (const [key, rangeId, numId, min, max] of FIELDS) {
  RANGE[key] = $(rangeId);
  NUM[key] = $(numId);
  RANGE[key].dataset.min = String(min);
  RANGE[key].dataset.max = String(max);
}

const value = (key) => Number(RANGE[key].value);
const setRange = (key, v) => {
  RANGE[key].value = String(v);
};

const round2 = (n) => Math.round(n * 100) / 100;
const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);

// ---------------------------------------------------------------------------
// Anillos del dial
//
// Los sectores OKLCH se derivan de la conversión real (primarios HSL a
// saturación/luz plenas), no de una tabla fija.
// ---------------------------------------------------------------------------
function updateDialRings(s, l, c, ol) {
  hslRing.style.background = `conic-gradient(
      from 0deg,
      hsl(0, ${s}%, ${l}%) 0deg 60deg,
      hsl(60, ${s}%, ${l}%) 60deg 120deg,
      hsl(120, ${s}%, ${l}%) 120deg 180deg,
      hsl(180, ${s}%, ${l}%) 180deg 240deg,
      hsl(240, ${s}%, ${l}%) 240deg 300deg,
      hsl(300, ${s}%, ${l}%) 300deg 360deg
  )`;

  const raw = ColorMath.primaryOklchHues(100, 50);
  const hues = raw.map((v, i) => (i > 0 && v < raw[i - 1] - 180 ? v + 360 : v));
  const stops = [];
  for (let i = 0; i < hues.length - 1; i++) {
    const from = i === 0 ? 0 : hues[i - 1];
    stops.push(
      `oklch(${ol}% ${c}% ${round2(hues[i])}) ${round2(from)}deg ${round2(hues[i])}deg`,
    );
  }
  // Último tramo: de la magenta al cierre de 360°, pintado con el rojo.
  stops.push(
    `oklch(${ol}% ${c}% ${round2(hues[0])}) ${round2(hues[hues.length - 2])}deg 360deg`,
  );

  oklchRing.style.background = `conic-gradient(from 0deg, ${stops.join(", ")})`;
}

// Gradientes de los sliders de tono. Son estáticos: se pintan una sola vez.
function paintHueTracks() {
  const hslStops = [];
  const oklchStops = [];
  for (let h = 0; h <= 360; h += 15) {
    hslStops.push(`hsl(${h}, 100%, 50%)`);
    oklchStops.push(`oklch(50% 50% ${h})`);
  }
  RANGE.hslHue.style.background = `linear-gradient(to right, ${hslStops.join(", ")})`;
  RANGE.oklchHue.style.background = `linear-gradient(to right, ${oklchStops.join(", ")})`;
}

// ---------------------------------------------------------------------------
// Sincronización de tono
//
// El tono OKLCH se DERIVA del color del panel HSL: mover la saturación o la
// luz cambia el tono equivalente, y es justo el motivo por el que un
// hex/hsla no "equivale" a un único oklch().
// ---------------------------------------------------------------------------
function syncHue(source) {
  // Tras pegar un color ya están los tres tonos puestos a mano: no re-derivar.
  if (source === "apply") return;

  const s = value("hslSat");
  const l = value("hslLight");

  if (source === "oklchHue") {
    const resolved = ColorMath.oklchHueToHslHue(value("oklchHue"), s, l, value("hslHue"));
    if (resolved !== null) setRange("hslHue", resolved);
    return;
  }

  const h = value("hslHue");
  const ok = ColorMath.hslHueToOklchHue(h, s, l);
  if (ok !== null) setRange("oklchHue", Math.round(ok));
}

// ---------------------------------------------------------------------------
// UI principal
// ---------------------------------------------------------------------------
function updateUI(source) {
  syncHue(source);

  const hslH = value("hslHue");
  const s = value("hslSat");
  const l = value("hslLight");
  const okH = value("oklchHue");
  const c = value("oklchChroma");
  const ol = value("oklchLight");

  // Puntero y centro del dial
  pointer.style.transform = `translateX(-50%) rotate(${hslH}deg)`;
  angleDisplay.innerText = `${hslH}°`;

  // Números (no pisar el que se está escribiendo a mano)
  const editing = document.activeElement;
  for (const [key] of FIELDS) {
    if (NUM[key] !== editing) NUM[key].value = String(value(key));
  }

  // Los anillos no dependen del tono
  if (source !== "hslHue" && source !== "oklchHue") {
    updateDialRings(s, l, c, ol);
  }

  // Colores de cada panel
  const hslRgb = ColorMath.hslToRgb(hslH, s, l);
  const okRgb = ColorMath.oklchToRgb(ol / 100, (c / 100) * ColorMath.CHROMA_UNIT, okH);

  const hslColor = `hsl(${hslH}, ${s}%, ${l}%)`;
  const oklchColor = `oklch(${ol}% ${c}% ${okH})`;

  $("hslPreview").style.backgroundColor = hslColor;
  $("oklchPreview").style.backgroundColor = oklchColor;

  $("hslCode").innerText = hslColor;
  $("oklchCode").innerText = oklchColor;

  // ¿Cabe en sRGB o el navegador va a recortar?
  $("oklchGamut").hidden = ColorMath.inSrgbGamut(
    ol / 100,
    (c / 100) * ColorMath.CHROMA_UNIT,
    okH,
  );

  // Equivalencias exactas del color del panel HSL
  $("chipHex").innerText = ColorMath.formatHex(hslRgb[0], hslRgb[1], hslRgb[2]);
  $("chipHsl").innerText = ColorMath.formatHsl(hslRgb[0], hslRgb[1], hslRgb[2]);
  $("chipOklch").innerText = ColorMath.formatOklch(hslRgb[0], hslRgb[1], hslRgb[2]);

  writeUrl();
}

// Estado en la URL para poder compartir un color. replaceState para no llenar
// el historial al arrastrar, y en try/catch porque file:// lo prohíbe.
function writeUrl() {
  try {
    const params = new URLSearchParams();
    for (const [key] of FIELDS) params.set(key, String(value(key)));
    history.replaceState(null, "", `${location.pathname}?${params}`);
  } catch {
    /* noop */
  }
}

function readUrl() {
  try {
    const params = new URLSearchParams(location.search);
    let found = false;
    for (const [key, , , min, max] of FIELDS) {
      const raw = params.get(key);
      if (raw === null) continue;
      const n = Number(raw);
      if (!Number.isFinite(n)) continue;
      setRange(key, clamp(Math.round(n), min, max));
      found = true;
    }
    return found;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Pegar un color
// ---------------------------------------------------------------------------
// `oklchTriple` es el triple tecleado, si el input era un oklch(). Manda
// sobre el derivado del rgb: así el panel muestra lo que se pidió aunque no
// quepa en sRGB y el aviso "Fuera de Gamut" se enciende.
function applyColor(parsed, oklchTriple) {
  const { h, s, l } = ColorMath.rgbToHsl(parsed.r, parsed.g, parsed.b);
  const o = ColorMath.rgbToOklch(parsed.r, parsed.g, parsed.b);

  // roundHue normaliza a [0,360): sin esto un color casi-rojo redondea a 360
  // y sale hsl(360, …) en el código, que es el mismo color que hsl(0, …).
  const roundHue = (v) => Math.round(v) % 360;

  setRange("hslHue", roundHue(h));
  setRange("hslSat", Math.round(s));
  setRange("hslLight", Math.round(l));
  const typed = oklchTriple ?? { h: o.h, l: o.l, c: o.c };
  setRange("oklchHue", roundHue(typed.h));
  setRange("oklchChroma", clamp(Math.round((typed.c / ColorMath.CHROMA_UNIT) * 100), 0, 100));
  setRange("oklchLight", clamp(Math.round(typed.l * 100), 0, 100));

  updateUI("apply");
}

function applyFromInput() {
  const field = $("colorInput");
  const error = $("colorInputError");
  const raw = field.value.trim();

  if (!raw) {
    error.textContent = "Escribe un color: #ff0000, hsl(49 100% 50%) u oklch(…)";
    error.hidden = false;
    return;
  }

  const parsed = ColorMath.parseCssColor(raw);
  if (parsed === null) {
    error.textContent = `No reconozco «${raw}». Prueba con #ff0000, hsl(49 100% 50%) u oklch(62.8% 64.42% 29.23). (CIE LCH no está soportado.)`;
    error.hidden = false;
    return;
  }

  error.hidden = true;
  applyColor(parsed, ColorMath.parseOkLchTriple(raw));
  // Deja normalizado lo que se ha entendido
  field.value = ColorMath.formatHex(parsed.r, parsed.g, parsed.b);
}

// ---------------------------------------------------------------------------
// Copiar chips
// ---------------------------------------------------------------------------
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    /* seguimos con el fallback */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}

$("outputChips").addEventListener("click", async (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  const key = chip.querySelector(".chip-key");
  const original = key.dataset.label || key.innerText;
  key.dataset.label = original;
  const ok = await copyText(chip.querySelector("code").innerText);
  key.innerText = ok ? "✓ copiado" : "¡fallo!";
  chip.classList.toggle("copied", ok);
  setTimeout(() => {
    key.innerText = original;
    chip.classList.remove("copied");
  }, 1200);
});

// ---------------------------------------------------------------------------
// Arrastre del dial (Pointer Events: cubre ratón, lápiz y táctil)
// ---------------------------------------------------------------------------
const MIN_DRAG_RADIUS = 30;
let isDragging = false;

function handleDrag(e) {
  const rect = wrapper.getBoundingClientRect();
  const deltaX = e.clientX - (rect.left + rect.width / 2);
  const deltaY = e.clientY - (rect.top + rect.height / 2);

  // Clics sobre el buje central: atan2(0,0) daría un ángulo arbitrario.
  if (Math.hypot(deltaX, deltaY) < MIN_DRAG_RADIUS) return;

  let angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI + 90;
  angle = ((angle % 360) + 360) % 360;

  setRange("hslHue", Math.round(angle));
  updateUI("hslHue");
}

wrapper.addEventListener("pointerdown", (e) => {
  try {
    wrapper.setPointerCapture(e.pointerId);
  } catch {
    // Sin captura el arrastre sigue funcionando: sólo se pierde el
    // seguimiento cuando el puntero sale del dial.
  }
  isDragging = true;
  handleDrag(e);
});
wrapper.addEventListener("pointermove", (e) => {
  if (isDragging) handleDrag(e);
});
const endDrag = () => {
  isDragging = false;
};
wrapper.addEventListener("pointerup", endDrag);
wrapper.addEventListener("pointercancel", endDrag);

// ---------------------------------------------------------------------------
// Listeners de sliders y de los inputs numéricos
// ---------------------------------------------------------------------------
for (const [key, , , min, max] of FIELDS) {
  RANGE[key].addEventListener("input", () => updateUI(key));

  NUM[key].addEventListener("input", () => {
    const raw = NUM[key].value.trim();
    if (raw === "") return; // dejando escribir
    const n = Number(raw);
    if (!Number.isFinite(n) || n < min || n > max) return; // aún incompleto
    setRange(key, Math.round(n));
    updateUI(key);
  });

  NUM[key].addEventListener("change", () => {
    const n = Number(NUM[key].value);
    const fixed = clamp(Math.round(Number.isFinite(n) ? n : value(key)), min, max);
    NUM[key].value = String(fixed);
    setRange(key, fixed);
    updateUI(key);
  });
}

$("applyColor").addEventListener("click", applyFromInput);
$("colorInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    applyFromInput();
  }
});

// ---------------------------------------------------------------------------
// Inicializar
// ---------------------------------------------------------------------------
paintHueTracks();
readUrl();
updateUI("init");
