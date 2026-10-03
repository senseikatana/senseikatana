// Referencias DOM
const wrapper = document.getElementById("dialWrapper");
const pointer = document.getElementById("pointer");
const angleDisplay = document.getElementById("angleDisplay");
const hslRing = document.getElementById("hslRing");
const oklchRing = document.getElementById("oklchRing");

// Sliders
const hslHueSlider = document.getElementById("hslHueSlider");
const hslSatSlider = document.getElementById("hslSatSlider");
const hslLightSlider = document.getElementById("hslLightSlider");
const oklchHueSlider = document.getElementById("oklchHueSlider");
const oklchChromaSlider = document.getElementById("oklchChromaSlider");
const oklchLightSlider = document.getElementById("oklchLightSlider");

// Lecturas numéricas
const hslHueVal = document.getElementById("hslHueVal");
const hslSatVal = document.getElementById("hslSatVal");
const hslLightVal = document.getElementById("hslLightVal");
const oklchHueVal = document.getElementById("oklchHueVal");
const oklchChromaVal = document.getElementById("oklchChromaVal");
const oklchLightVal = document.getElementById("oklchLightVal");

// Previews y código
const hslPreview = document.getElementById("hslPreview");
const hslCode = document.getElementById("hslCode");
const oklchPreview = document.getElementById("oklchPreview");
const oklchCode = document.getElementById("oklchCode");

const MIN_DRAG_RADIUS = 30;

// 1. Anillos del dial. Los sectores OKLCH se derivan de la conversión real
//    (primarios HSL a saturación/luz plenas), no de una tabla fija.
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
    stops.push(`oklch(${ol}% ${c}% ${round2(hues[i])}) ${round2(from)}deg ${round2(hues[i])}deg`);
  }
  // Último tramo: de la magenta al roto de 360°, pintado con el rojo (vuelta al 0).
  stops.push(`oklch(${ol}% ${c}% ${round2(hues[0])}) ${round2(hues[hues.length - 2])}deg 360deg`);

  oklchRing.style.background = `conic-gradient(from 0deg, ${stops.join(", ")})`;
}

const round2 = (n) => Math.round(n * 100) / 100;

// Gradientes de los sliders de tono. Son estáticos: se construyen una sola vez.
function paintHueTracks() {
  const hslStops = [];
  const oklchStops = [];
  for (let h = 0; h <= 360; h += 15) {
    hslStops.push(`hsl(${h}, 100%, 50%)`);
    oklchStops.push(`oklch(50% 50% ${h})`);
  }
  hslHueSlider.style.background = `linear-gradient(to right, ${hslStops.join(", ")})`;
  oklchHueSlider.style.background = `linear-gradient(to right, ${oklchStops.join(", ")})`;
}

// 2. UI principal. El tono OKLCH se deriva del color HSL actual: mover la
//    saturación o la luz cambia el tono equivalente, y es exactamente el
//    motivo por el que un hex/hsla no "equivale" a un único oklch().
function updateUI(source) {
  const s = Number(hslSatSlider.value);
  const l = Number(hslLightSlider.value);

  if (source === "oklchHue") {
    const resolved = ColorMath.oklchHueToHslHue(
      Number(oklchHueSlider.value),
      s,
      l,
      Number(hslHueSlider.value),
    );
    if (resolved !== null) hslHueSlider.value = resolved;
  } else {
    const derived = ColorMath.hslHueToOklchHue(Number(hslHueSlider.value), s, l);
    if (derived !== null) oklchHueSlider.value = Math.round(derived);
  }

  const hslH = Number(hslHueSlider.value);
  const okH = Number(oklchHueSlider.value);
  const c = Number(oklchChromaSlider.value);
  const ol = Number(oklchLightSlider.value);

  // Puntero y centro del dial
  pointer.style.transform = `translateX(-50%) rotate(${hslH}deg)`;
  angleDisplay.innerText = `${hslH}°`;

  // Etiquetas
  hslHueVal.innerText = `${hslH}°`;
  hslSatVal.innerText = `${s}%`;
  hslLightVal.innerText = `${l}%`;
  oklchHueVal.innerText = `${okH}°`;
  oklchChromaVal.innerText = `${c}%`;
  oklchLightVal.innerText = `${ol}%`;

  // Los anillos no dependen del tono
  if (source !== "hslHue" && source !== "oklchHue") updateDialRings(s, l, c, ol);

  // Cajas físicas y código CSS
  const hslColor = `hsl(${hslH}, ${s}%, ${l}%)`;
  const oklchColor = `oklch(${ol}% ${c}% ${okH})`;

  hslPreview.style.backgroundColor = hslColor;
  hslCode.innerText = hslColor;

  oklchPreview.style.backgroundColor = oklchColor;
  oklchCode.innerText = oklchColor;
}

// 3. Arrastre del dial (Pointer Events: cubre ratón, lápiz y táctil).
let isDragging = false;

function handleDrag(e) {
  const rect = wrapper.getBoundingClientRect();
  const deltaX = e.clientX - (rect.left + rect.width / 2);
  const deltaY = e.clientY - (rect.top + rect.height / 2);

  // Clics sobre el buje central: atan2(0,0) daría un ángulo arbitrario.
  if (Math.hypot(deltaX, deltaY) < MIN_DRAG_RADIUS) return;

  let angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI + 90;
  angle = ((angle % 360) + 360) % 360;

  hslHueSlider.value = Math.round(angle);
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

// 4. Sliders
hslHueSlider.addEventListener("input", () => updateUI("hslHue"));
hslSatSlider.addEventListener("input", () => updateUI("hslSat"));
hslLightSlider.addEventListener("input", () => updateUI("hslLight"));

oklchHueSlider.addEventListener("input", () => updateUI("oklchHue"));
oklchChromaSlider.addEventListener("input", () => updateUI("oklchChroma"));
oklchLightSlider.addEventListener("input", () => updateUI("oklchLight"));

// 5. Inicializar
paintHueTracks();
updateUI("init");
